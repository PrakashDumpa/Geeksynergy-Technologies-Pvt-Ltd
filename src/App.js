import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import WebLayout from "./components/WebLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Authentication />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <WebLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
