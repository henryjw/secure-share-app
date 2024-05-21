import {Alert, Button, Flex, Input, Label} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Layout from "./components/Layout.tsx";
import {useState} from "react";

function App() {
    const [err, setError] = useState<Error | null>(null);

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
            >
                <form style={{width: "100%"}} onSubmit={(e) => {
                    e.preventDefault()
                    try {
                        createSnippet()
                    } catch(err) {
                        setError(err as Error)
                    }
                }}>
                    <Label htmlFor="create-snippet" fontWeight="semibold">New Snippet</Label>
                    <Input
                        as="textarea"
                        size="large"
                        height="20rem"
                        id="create-snippet"
                        isRequired
                    ></Input>
                    <Flex justifyContent="start">
                        <Button type="submit" size="small" variation="primary">Create New Snippet</Button>
                    </Flex>
                </form>
            </Flex>
        </Layout>
    );
}

function createSnippet() {
    throw new Error('Not yet implemented');
}

export default App;