import {Authenticator, useAuthenticator} from "@aws-amplify/ui-react";
import { redirect} from 'react-router';
import Layout from "../components/Layout";
import {ROUTES} from "../constants.ts";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user } = useAuthenticator((context) => [context.user]);

    if (user) {
        navigate(ROUTES.HOME)
        return
    }

    return (
        <Layout>
            <Authenticator>
                {() => {
                    redirect(ROUTES.HOME)
                    return <></>
                }}
            </Authenticator>
        </Layout>
    )
}