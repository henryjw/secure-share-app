import {Authenticator, useAuthenticator} from "@aws-amplify/ui-react";
import Layout from "../components/Layout";
import {ROUTES} from "../constants.ts";

export default function SignUpPage() {
    const { toSignUp } = useAuthenticator((context) => [context.user]);

    toSignUp()
    return (
        <Layout>
            <Authenticator>
                {() => {
                    window.location.href = ROUTES.HOME
                    return <></>
                }}
            </Authenticator>
        </Layout>
    )
}