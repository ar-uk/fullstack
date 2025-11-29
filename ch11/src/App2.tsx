import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import ContactLondon from "./ContactLondon";
import ContactParis from "./ContactParis";
import PageNotFound from "./PageNotFound";
import "./App.css";

function App2() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link>{" | "}
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />}>
          <Route path="london" element={<ContactLondon />} />
          <Route path="paris" element={<ContactParis />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App2;
