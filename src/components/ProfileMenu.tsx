import {Button, Flex, Menu, MenuButton, MenuItem, useAuthenticator} from "@aws-amplify/ui-react";
import {FaUser} from "react-icons/fa";
import {ROUTES} from "../constants.ts";
import {useNavigate} from "react-router-dom";

export function ProfileMenu() {
    const navigate = useNavigate();
    const { user, signOut,  } = useAuthenticator((context) => [context.user]);

    if (!user) {
        return (
            <Flex direction="row">
                <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
                <Button onClick={() => navigate(ROUTES.SIGNUP)}>Create Account</Button>
            </Flex>
        )
    }

    return (
        <Menu trigger={
            <MenuButton size="large">
                <FaUser/>
            </MenuButton>
        }>
            <MenuItem onClick={() => navigate(ROUTES.MANAGE_SNIPPETS)}>
                My Snippets
            </MenuItem>
            <MenuItem onClick={() => { signOut(); navigate(ROUTES.HOME) }}>
                Sign out
            </MenuItem>
        </Menu>
    )
}