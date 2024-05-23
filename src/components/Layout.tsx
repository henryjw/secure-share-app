import React from 'react';
import {Flex, View, Text, Divider, Button, } from '@aws-amplify/ui-react';

import {APP_NAME} from "../constants.ts";
import {ProfileMenu} from "./ProfileMenu.tsx";


interface AppLayoutProps {
    children: React.ReactNode; // Define the children prop type
}

const Layout: React.FC<AppLayoutProps> = ({children}) => {
    return (
        <Flex direction="column" minHeight="100vh">
            <View
                as="header"
                paddingTop="1rem"
                paddingLeft="1rem"
                backgroundColor="brand.primary"
                color="font.inverse"
            >
                <Flex justifyContent="space-between" padding="small">
                    {/* Add navigation links or other elements here */}
                    <Button onClick={() => window.location.href = "/"}>+New</Button>
                    <ProfileMenu/>
                </Flex>
            </View>

            <Divider/> {/* Visual separation */}

            <View as="main" padding="1rem" flex="max-content" alignSelf="center" width="100%">
                {children}
            </View>

            <Divider/> {/* Visual separation */}

            <View
                as="footer"
                padding="1rem"
                backgroundColor="neutral.light"
                alignSelf="center"
            >
                <Text>&copy; {new Date().getFullYear()} {APP_NAME}</Text>
            </View>

        </Flex>
    );
};


export default Layout;
