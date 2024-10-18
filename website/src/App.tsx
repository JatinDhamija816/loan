import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "../utils/AppContext";
import { Toaster } from "sonner";
import ProtectedRoute from "../utils/routes/ProtectedRoute";
import PublicRoute from "../utils/routes/PublicRoute";
import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from "./components/UserHome/HomePage";
import ApplyLoan from "./components/Loan/ApplyLoan";
import AdminHomePage from "./components/Admin/AdminHomePage";
import UserLoanDetails from "./components/UserHome/UserLoanDetails";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/applyLoan" element={<ApplyLoan />} />
            <Route path="/loanDetails" element={<UserLoanDetails />} />
            <Route path="/adminHomePage" element={<AdminHomePage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
