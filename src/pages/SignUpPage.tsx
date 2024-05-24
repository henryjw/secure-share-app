import {Authenticator, useAuthenticator} from "@aws-amplify/ui-react";
import Layout from "../components/Layout";
import {ROUTES} from "../constants.ts";
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {
    const { toSignUp, user } = useAuthenticator((context) => [context.user]);
    const navigate = useNavigate();

    if (user) {
        navigate(ROUTES.HOME)
        return
    }

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