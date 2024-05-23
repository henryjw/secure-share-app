import {Authenticator, View} from "@aws-amplify/ui-react";
import Layout from "../components/Layout.tsx";

export default function ManageSnippetsPage() {
    return (
        <Layout>
            <Authenticator>
                {({user}) => (
                    <View alignSelf="center">
                        <h1>Manage Snippets</h1>
                        <p>Not yet implemented</p>
                        <p>UserId: {user?.username}</p>
                    </View>
                )}
            </Authenticator>
        </Layout>
    )
}