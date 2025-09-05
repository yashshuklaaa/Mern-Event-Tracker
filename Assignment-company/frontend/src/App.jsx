

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicEvent from "./pages/PublicEvent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/public/:shareLink" element={<PublicEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

