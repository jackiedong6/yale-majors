import {Routes, Route} from "react-router-dom";

import Layout from "./components/layout";
import Landing from "./components/landing";
import About from "./components/about";
import ProtectedRoutes from "./auth/protectedRoutes";


function App() {
    // console.log(process.env.REACT_APP_API_URL)
    // console.log(process.env.REACT_APP_BACKEND_AUTH)

    return (
        // Setting up routes and elements
        <Routes>

            {/* Wrapping each page around Layout element */}
            <Route element={<Layout/>}>
                {/* Login route at index */}
                <Route path="/" element={<Landing/>}/>
                <Route path="/about" element={<About/>}/>
                {/* Protected Routes */}
                <Route element={<ProtectedRoutes/>}>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
