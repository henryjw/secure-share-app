import Layout from "../components/Layout.tsx";
import {useParams} from "react-router-dom";
import {Alert, Flex, Input, Label} from "@aws-amplify/ui-react";
import {generateClient} from "aws-amplify/api";
import type {Schema} from "../../amplify/data/resource.ts";
import {useEffect, useState} from "react";
import {formatDate} from "../utils/dates.ts";

const client = generateClient<Schema>();

export default function ViewSnippetPage() {
    const {id: snippetId} = useParams<{ id: string }>();
    const [snippetContent, setSnippetContent] = useState<string>("Loading...");
    const [err, setError] = useState<Error | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        client.models.Snippet.get({
            id: snippetId as string
        }).then(async (snippet) => {
            console.log('Snippet:', snippet)
            if (!snippet.data) {
                setMessage('Snippet not found. It may have expired or been deleted.');
                setSnippetContent('');
                return;
            }

            const data = snippet.data;
            const isExpired = data.expiration && data.expiration < Date.now();

            if (data.burnOnRead) {
                setMessage('This snippet has been marked for deletion after reading.');
                await deleteSnippet(data.id);
            } else if (data.expiration) {
                setMessage(`This snippet will expire on ${formatDate(data.expiration)}`);
            }

            // Hacky way to handle expired snippets. It would be better to re-render the component after deleting the snippet.
            if (isExpired) {
                await deleteSnippet(data.id);
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
    }, [snippetId]);

    return (
        // FIXME: there's a lot of duplication here that's common with CreateNewSnippetPage.tsx. Consider refactoring.
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
                <form style={{width: "100%", maxWidth: "1500px"}}>
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
                    /></form>
            </Flex>
        </Layout>
    )
}

async function deleteSnippet(id: string): Promise<void> {
    try {
        await client.models.Snippet.delete({
            id,
        });
    } catch (err) {
        console.error('Error updating Snippet:', err)
    }
}