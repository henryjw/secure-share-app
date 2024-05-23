import {Button, Flex, Menu, MenuButton, MenuItem, useAuthenticator} from "@aws-amplify/ui-react";
import {FaUser} from "react-icons/fa";
import {ROUTES} from "../constants.ts";

export function ProfileMenu() {
    const { user, signOut, toSignUp, toSignIn } = useAuthenticator((context) => [context.user]);

    if (!user) {
        return (
            <Flex direction="row">
                <Button onClick={() => toSignIn()}>Login</Button>
                <Button onClick={() => toSignUp()}>Create Account</Button>
            </Flex>
        )
    }

    return (
        <Menu trigger={
            <MenuButton size="large">
                <FaUser/>
            </MenuButton>
        }>
            <MenuItem onClick={() => window.location.href = ROUTES.MANAGE_SNIPPETS}>
                My Snippets
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
                Sign out
            </MenuItem>
        </Menu>
    )
}