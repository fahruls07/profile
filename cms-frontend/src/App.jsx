import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProfileEditor from "./pages/ProfileEditor";
import Experiences from "./pages/Experiences";
import Education from "./pages/Education";
import Articles from "./pages/Articles";
import Contact from "./pages/Contact";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  <Route path="/profile" element={<ProfileEditor />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
