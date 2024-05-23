import { Authenticator } from "@aws-amplify/ui-react";
import Layout from "../components/Layout";
import {ROUTES} from "../constants.ts";

export default function LoginPage() {
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