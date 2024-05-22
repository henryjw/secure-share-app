import Layout from "../components/Layout.tsx";
import {useParams} from "react-router-dom";

export default function ViewSnippetPage() {
    const {id: snippetId} = useParams<{ id: string }>();
    return (
        <Layout>
            <h1>View Snippet</h1>
            Snippet ID: {snippetId}
        </Layout>
    )
}