import {BrowserRouter, Route, Routes} from 'react-router-dom';

import '@aws-amplify/ui-react/styles.css';
import CreateNewSnippetPage from "./pages/CreateNewSnippetPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ViewSnippetPage from "./pages/ViewSnippetPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateNewSnippetPage/>}></Route>
                <Route path="/snippet/:id" element={<ViewSnippetPage/>}></Route>
                <Route path="*" element={<NotFoundPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App;