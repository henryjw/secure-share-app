import {Alert, Button, Flex, Input, Label} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/data';
import {useState} from "react";

import Layout from "./components/Layout.tsx";
import type { Schema } from '../amplify/data/resource'; // Path to your backend resource definition


type Snippet = {
    content: string;
    expiration: Date | null;
    burnOnRead: boolean;
}

const client = generateClient<Schema>();

function App() {
    const [err, setError] = useState<Error | null>(null);
    const [submitting, setSubmitting] = useState(false);

    return (
        <Layout>
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
                    setSubmitting(true);
                    createSnippet({
                        content: e.target.createSnippet.value,
                        expiration: null,
                        burnOnRead: false
                    })
                        .then(() => {
                            setError(null);
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
                        <Button type="submit" size="small" variation="primary" isLoading={submitting}>Create New Snippet</Button>
                    </Flex>
                </form>
            </Flex>
        </Layout>
    );
}

async function createSnippet(snippet: Snippet) {
    await client.models.Snippet.create({
        content: snippet.content,
        burnOnRead: snippet.burnOnRead,
        expiration: snippet.expiration?.getTime() || undefined,
    });

    // TODO: redirect to a new page page with the link to the snippet
    alert("Snippet created!");
}

export default App;