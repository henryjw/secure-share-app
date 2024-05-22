import {Alert, Button, Flex, Input, Label, Link} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {generateClient} from 'aws-amplify/data';
import {useState} from "react";

import Layout from "./components/Layout.tsx";
import type {Schema} from '../amplify/data/resource';
import {FaClipboard} from "react-icons/fa";


type Snippet = {
    content: string;
    expiration: Date | null;
    burnOnRead: boolean;
}

const client = generateClient<Schema>();

function App() {
    const [err, setError] = useState<Error | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [snippetUrl, setSnippetUrl] = useState<string | null>(null);

    return (
        <Layout>
            {snippetUrl && <Alert
                variation="info"
                isDismissible={false}
            >Your snippet is URL <Link>{snippetUrl}</Link>
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

    const snippetUrl = `${window.location.origin}/${result.data?.id}`

    return snippetUrl
}

async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
}

export default App;