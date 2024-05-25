import {useState} from "react";
import Layout from "../components/Layout.tsx";
import {Alert, Button, Flex, Input, Label, Link, SelectField, TextField, useAuthenticator} from "@aws-amplify/ui-react";
import moment from 'moment';
import {generateClient} from "aws-amplify/api";
import type {Schema} from "../../amplify/data/resource";
import {getSnippetAbsoluteUrl} from "../utils/urls";
import {getAuthMode} from "../utils/auth";
import {buildSnippetPayload} from "../utils/data";
import CopyToClipboardButton from "../components/CopyToClipboardButton.tsx";

const client = generateClient<Schema>();

type Snippet = {
    content: string;
    expiration: number | null;
    burnOnRead: boolean;
}

export default function CreateNewSnippetPage(): JSX.Element {
    const [err, setError] = useState<Error | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [snippetUrl, setSnippetUrl] = useState<string | null>(null);
    const {user} = useAuthenticator((context) => [context.user]);

    const isLoggedIn = !!user;

    return (
        <Layout>
            <Flex id="messages" justifyContent="center">
                {snippetUrl && <Alert
                    variation="info"
                    isDismissible={false}
                >Your snippet is URL <Link href={snippetUrl}>{snippetUrl}</Link>
                    <CopyToClipboardButton contents={snippetUrl}/>
                </Alert>}
                {err && <Alert
                    variation="error"
                    isDismissible={true}
                    onDismiss={() => setError(null)}
                >{err.message}</Alert>}
            </Flex>
            <Flex
                direction={{base: 'column', large: 'row'}}
                padding="1rem"
                justifyContent="center"
            >
                <form style={{width: "100%", maxWidth: "1500px"}} onSubmit={(e) => {
                    e.preventDefault()

                    const form = e.target as HTMLFormElement;

                    const formData = {
                        content: form["createSnippet"].value,
                        expiration: parseInt(form["expiration"].value, 10) || null,
                        burnOnRead: form["burnOnRead"].value === "true",
                        password: form["password"].value,
                    }

                    buildSnippetPayload({
                        rawText: formData.content,
                        password: formData.password,
                    })
                        .then((content: string) => {
                            setSubmitting(true);
                            return  createSnippet({
                                content,
                                expiration: formData.expiration,
                                burnOnRead: formData.burnOnRead,
                            }, isLoggedIn)
                        })
                        .then((url: string) => {
                            setError(null);
                            setSnippetUrl(url);
                            form.reset();
                        })
                        .catch(err => setError(err as Error)).finally(() => setSubmitting(false));
                }}>
                    <Label htmlFor="create-snippet" fontWeight="semibold">New Snippet</Label>
                    <Input
                        as="textarea"
                        size="large"
                        height="20rem"
                        id="create-snippet"
                        name="createSnippet"
                        isRequired
                    />
                    <Flex direction={{base: "column", small: "row", medium: "row"}}>
                        <SelectField name="expiration" label="Expiration">
                            <option value="0">Never</option>
                            <option value={moment().add(1, 'minute').utc().toDate().getTime()}>1 minute</option>
                            <option value={moment().add(10, 'minutes').utc().toDate().getTime()}>10 minutes</option>
                            <option value={moment().add(1, 'hour').utc().toDate().getTime()}>1 hour</option>
                            <option value={moment().add(1, 'day').utc().toDate().getTime()}>1 day</option>
                            <option value={moment().add(1, 'week').utc().toDate().getTime()}>1 week</option>
                        </SelectField>
                        <SelectField label="Burn on Read" name="burnOnRead">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </SelectField>
                        <TextField
                            name="password"
                            placeholder="Password"
                            label="Password (Recommended)"
                        />
                    </Flex>
                    <Flex paddingTop="1rem">
                        <Button
                            type="submit" size="small" variation="primary" isLoading={submitting}
                        >Create New Snippet</Button>
                    </Flex>
                </form>
            </Flex>
        </Layout>
    );
}

async function createSnippet(snippet: Snippet, isLoggedIn: boolean): Promise<string> {
    const result = await client.models.Snippet.create({
        content: snippet.content,
        burnOnRead: snippet.burnOnRead,
        expiration: snippet.expiration || undefined,
    }, {
        authMode: getAuthMode(isLoggedIn),
    });

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    if (!result.data) {
        throw new Error('Failed to create snippet');
    }

    return getSnippetAbsoluteUrl(result.data.id);
}