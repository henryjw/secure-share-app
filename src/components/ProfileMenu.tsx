import {Button, Flex, Menu, MenuButton, MenuItem, useAuthenticator} from "@aws-amplify/ui-react";
import {FaUser} from "react-icons/fa";
import {ROUTES} from "../constants.ts";

export function ProfileMenu() {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    if (!user) {
        return (
            <Flex direction="row">
                <Button onClick={() => window.location.href = ROUTES.LOGIN}>Login</Button>
                <Button onClick={() => window.location.href = ROUTES.SIGNUP}>Create Account</Button>
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
            <MenuItem onClick={() => { signOut(); window.location.href = ROUTES.HOME }}>
                Sign out
            </MenuItem>
        </Menu>
    )
}