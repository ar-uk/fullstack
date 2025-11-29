import { Outlet, Link } from "react-router-dom";

function Contact() {
  return (
    <div>
      <h3>Contact component</h3>
      <nav>
        <Link to="london">London</Link>{" | "}
        <Link to="paris">Paris</Link>
      </nav>
      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
}

export default Contact;
