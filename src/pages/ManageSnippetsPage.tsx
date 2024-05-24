import {
    Alert,
    Authenticator,
    Flex, Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useAuthenticator, View,
} from "@aws-amplify/ui-react";
import {useEffect, useState} from "react";
import {generateClient} from "aws-amplify/api";
import {FaTrash} from "react-icons/fa";
import {getAuthMode} from "../utils/auth.ts";
import {useNavigate} from "react-router-dom";
import './ManageSnippetsPage.css';

import Layout from "../components/Layout.tsx";
import {getSnippetAbsoluteUrl, getSnippetRelativeUrl} from "../utils/urls.ts";
import type {Schema} from "../../amplify/data/resource.ts";
import {ROUTES} from "../constants.ts";
import type {Snippet} from '../../API';
import {formatDate} from "../utils/dates.ts";

const client = generateClient<Schema>();


export default function ManageSnippetsPage() {
    const [err, setError] = useState<Error | null>(null);
    const {user} = useAuthenticator((context) => [context.user]);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [deletingIds, setDeletingIds] = useState<string[]>([]);
    const navigate = useNavigate();

    if (!user) {
        navigate(ROUTES.LOGIN)
    }

    useEffect(() => {
        const isLoggedIn = !!user;
        if (!isLoggedIn) {
            setError(new Error('You must be signed in to view this page.'));
            return
        } else {
            setError(null)
        }

        client.models.Snippet.list({
                filter: {
                    createdBy: {
                        // For some reason, the value is stored as `<id>::<id>` in the database
                        beginsWith: user.userId
                    }
                },
                authMode: getAuthMode(isLoggedIn),
            },
        )
            .then(({data: snippets, errors}) => {
                if (errors) {
                    setError(new Error(errors[0].message));
                    return
                }

                console.log('Snippets:', snippets)
                setSnippets((snippets || []) as Snippet[])
            }).catch((err) => {
            console.error('Error:', err)
        });
    }, [user]);

    const deleteSnippet = async (id: string) => {
        try {
            const { errors } = await client.models.Snippet.delete({
                id: id
            })

            if (errors) {
                console.error('Error deleting snippet', errors)
                setError(new Error(errors[0].message))
                return
            }

            setDeletingIds([id])
            setTimeout(() => {
                setSnippets(snippets.filter((snippet: { id: string }) => snippet.id !== id))
            }, 500)
        } catch (err) {
            console.error('Error deleting snippet:', err)
            setError(err as Error)
        }
    }

    return (
        <Layout>
            <Authenticator>
                {() => (
                    <View>
                        <Flex id="messages" justifyContent="center">
                            {err && <Alert
                                variation="error"
                                isDismissible={true}
                                onDismiss={() => setError(null)}
                            >{err.message}</Alert>}
                        </Flex>
                        <Flex direction="column" justifyContent="center">
                            <h2>My Snippets</h2>
                            <Table
                                caption=""
                                highlightOnHover={false}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell as="th">Created At</TableCell>
                                        <TableCell as="th">URL</TableCell>
                                        <TableCell as="th">Burn on Read</TableCell>
                                        <TableCell as="th">Expires</TableCell>
                                        <TableCell as="th">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {snippets.map((snippet) => (
                                        <TableRow key={snippet.id} className={deletingIds.includes(snippet.id) ? 'fade-out' : ''}>
                                            <TableCell>{formatDate(snippet.createdAt)}</TableCell>
                                            <TableCell>
                                                <Link
                                                    href={getSnippetAbsoluteUrl(snippet.id)}>{getSnippetRelativeUrl(snippet.id)}</Link>
                                            </TableCell>
                                            <TableCell>{snippet.burnOnRead ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{formatDate(snippet.expiration)}</TableCell>
                                            <TableCell>
                                                <FaTrash
                                                    onClick={() => deleteSnippet(snippet.id)}
                                                    style={{cursor: 'pointer'}}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Flex>
                    </View>
                )}
            </Authenticator>
        </Layout>
    )
}

