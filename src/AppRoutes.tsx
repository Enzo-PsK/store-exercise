import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Parts from "./pages/Parts";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/parts" element={<Parts />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </Router>
  );
}