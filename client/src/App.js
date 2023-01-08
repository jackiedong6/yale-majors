import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout";
import Landing from "./components/landing";
import ProtectedRoutes from "./auth/protectedRoutes";

function App() {


  return (
      // Setting up routes and elements
      <Routes>
        {/* Wrapping each page around Layout element */}
        <Route element={<Layout />}>
          {/* Login route at index */}
          <Route path="/" element={<Landing />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
