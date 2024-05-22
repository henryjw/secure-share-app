import Layout from "../components/Layout.tsx";
import {useParams} from "react-router-dom";
import {Alert, Flex, Input, Label, TextAreaField} from "@aws-amplify/ui-react";
import {generateClient} from "aws-amplify/api";
import type {Schema} from "../../amplify/data/resource.ts";
import {useState} from "react";

const client = generateClient<Schema>();

export default function ViewSnippetPage() {
    const {id: snippetId} = useParams<{ id: string }>();
    const [snippetContent, setSnippetContent] = useState<string>("Loading...");
    const [err, setError] = useState<Error | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    client.models.Snippet.get({
        id: snippetId as string
    }).then((snippet) => {
        console.log('Snippet:', snippet)
        if (!snippet.data) {
            setMessage('Snippet not found. It may have expired or been deleted.');
            setSnippetContent('');
            return;
        }

        setSnippetContent(snippet.data?.content || '');
    }).catch((err) => {
        console.error('Error:', err)
        setError(err.message);
        setSnippetContent('');
    });

    return (
        <Layout>
            <Flex id="messages" justifyContent="center" paddingBottom="small">
                {message && <Alert
                    variation="info"
                    isDismissible={false}
                > {message}
                </Alert>}
                {err && <Alert
                    variation="error"
                    isDismissible={true}
                    onDismiss={() => setError(null)}
                >{err.message || 'An error occurred. Please try again.'}</Alert>}
            </Flex>
            <Flex direction={{base: 'column', large: 'row'}} justifyContent="center">
                {/*TODO: add a button / icon to copy contents to clipboard*/}
                <Label htmlFor="view-snippet" fontWeight="semibold">Snippet Contents</Label>
                <Input
                    id="view-snippet"
                    as="textarea"
                    backgroundColor="background.disabled"
                    height="20rem"
                    boxShadow="medium"
                    readOnly={true}
                    aria-multiline={true}
                    value={snippetContent}
                    style={{whiteSpace: 'pre'}} // Preserve line breaks
                />
            </Flex>
        </Layout>
    )
}