import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Binance from "./pages/binance";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { username: "admin", password: "admin123" },
        { username: "john", password: "doe456" },
      ])
    );
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/binance" element={<Binance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
