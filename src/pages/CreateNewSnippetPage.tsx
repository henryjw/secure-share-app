import {useState} from "react";
import Layout from "../components/Layout.tsx";
import {Alert, Button, Flex, Input, Label, Link} from "@aws-amplify/ui-react";
import {FaClipboard} from "react-icons/fa";
import {generateClient} from "aws-amplify/api";
import type {Schema} from "../../amplify/data/resource.ts";

const client = generateClient<Schema>();

type Snippet = {
    content: string;
    expiration: Date | null;
    burnOnRead: boolean;
}

export default function CreateNewSnippetPage(): JSX.Element {
    const [err, setError] = useState<Error | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [snippetUrl, setSnippetUrl] = useState<string | null>(null);

    return (
        <Layout>
            <Flex id="messages" justifyContent="center">
                {snippetUrl && <Alert
                    variation="info"
                    isDismissible={false}
                >Your snippet is URL <Link href={snippetUrl}>{snippetUrl}</Link>
                    <Button
                        size="small"
                        paddingLeft="0.5rem"
                        marginLeft="0.5rem"
                        onClick={() => copyToClipboard(snippetUrl)}>Copy to clipboard<FaClipboard/>
                    </Button>
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

                    setSubmitting(true);
                    createSnippet({
                        content: form["createSnippet"].value,
                        expiration: null,
                        burnOnRead: false
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
                    ></Input>
                    <Flex justifyContent="start">
                        <Button type="submit" size="small" variation="primary" isLoading={submitting}>Create New
                            Snippet</Button>
                    </Flex>
                </form>
            </Flex>
        </Layout>
    );
}

async function createSnippet(snippet: Snippet): Promise<string> {
    const result = await client.models.Snippet.create({
        content: snippet.content,
        burnOnRead: snippet.burnOnRead,
        expiration: snippet.expiration?.getTime() || undefined,
    });

    const snippetUrl = `${window.location.origin}/snippet/${result.data?.id}`

    return snippetUrl
}

async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
}