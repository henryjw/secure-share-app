import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import {defaultDarkModeOverride, ThemeProvider} from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const theme = {
    name: 'theme',
    overrides: [defaultDarkModeOverride],
};


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme} colorMode="system">
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
