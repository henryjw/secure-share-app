import {BrowserRouter, Route, Routes} from 'react-router-dom';

import '@aws-amplify/ui-react/styles.css';
import CreateNewSnippetPage from "./pages/CreateNewSnippetPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ViewSnippetPage from "./pages/ViewSnippetPage.tsx";
import ManageSnippetsPage from "./pages/ManageSnippetsPage.tsx";
import {ROUTES} from "./constants.ts";
import { Authenticator } from '@aws-amplify/ui-react';

function App() {
    return (
        <BrowserRouter>
            <Authenticator.Provider>
                <Routes>
                    <Route path={ROUTES.HOME} element={<CreateNewSnippetPage/>}></Route>
                    <Route path={ROUTES.SNIPPET} element={<ViewSnippetPage/>}></Route>
                    <Route path={ROUTES.MANAGE_SNIPPETS} element={<ManageSnippetsPage/>}></Route>
                    <Route path="*" element={<NotFoundPage/>}></Route>
                </Routes>
            </Authenticator.Provider>
        </BrowserRouter>
    );
}


export default App;