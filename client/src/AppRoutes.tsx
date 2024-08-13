import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashLayout from "./layouts/dashLayout";
import ProfilePage from "./pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard/*"
        element={
          <DashLayout>
            <Routes>
              {/* <Route path="/" element={<DashboardPage />} /> */}
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<div>Orders Section</div>} />
              <Route
                path="restaurants"
                element={<div>Restaurants Section</div>}
              />
            </Routes>
          </DashLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
