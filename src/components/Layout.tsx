import React from 'react';
import { Flex, View, Text, Divider, Button } from '@aws-amplify/ui-react';
import {APP_NAME} from "../constants.ts";

interface AppLayoutProps {
    children: React.ReactNode; // Define the children prop type
}

const Layout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <Flex direction="column" minHeight="100vh">
            <View
                as="header"
                padding="1rem"
                backgroundColor="brand.primary"
                color="font.inverse"
            >
                <Flex justifyContent="space-between">
                    {/* Add navigation links or other elements here */}
                    <Button>+New</Button>
                </Flex>
            </View>

            <Divider /> {/* Visual separation */}

            <View as="main" padding="1rem" flex="max-content" alignSelf="center">
                {children}
            </View>

            <Divider /> {/* Visual separation */}

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
