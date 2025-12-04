import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/authComponent/ProtectedRoute";
import { isAuthenticated } from "./services/authAPI";
// import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          {/* Public Route - Redirect to home if already logged in */}
          <Route
            path="/auth"
            element={isAuthenticated() ? <Navigate to="/" replace /> : <AuthPage />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;























// import { RecoilRoot } from "recoil";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar/Navbar";

// function App() {
//   return (
//     <RecoilRoot>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </RecoilRoot>
//   );
// }

// export default App;