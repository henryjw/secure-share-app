import {BrowserRouter, Route, Routes} from 'react-router-dom';

import '@aws-amplify/ui-react/styles.css';
import CreateNewSnippetPage from "./pages/CreateNewSnippetPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ViewSnippetPage from "./pages/ViewSnippetPage.tsx";
import ManageSnippetsPage from "./pages/ManageSnippetsPage.tsx";
import {ROUTES} from "./constants.ts";
import { Authenticator } from '@aws-amplify/ui-react';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <Authenticator.Provider>
                <ToastContainer
                    autoClose={1000}
                    hideProgressBar={true}
                    position="top-center"
                    newestOnTop={true}
                />
                <Routes>
                    <Route path={ROUTES.HOME} element={<CreateNewSnippetPage/>}></Route>
                    <Route path={ROUTES.SNIPPET} element={<ViewSnippetPage/>}></Route>
                    <Route path={ROUTES.MANAGE_SNIPPETS} element={<ManageSnippetsPage/>}></Route>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>}></Route>
                    <Route path={ROUTES.SIGNUP} element={<SignUpPage/>}></Route>
                    <Route path="*" element={<NotFoundPage/>}></Route>
                </Routes>
            </Authenticator.Provider>
        </BrowserRouter>
    );
}


export default App;