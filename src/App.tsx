import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings.jsx";
import Account from "./pages/UserSettings.js";
import Login from "./pages/Login.js";
import PageNotFound from "./pages/PageNotFound.js";
import Settings from "./pages/Settings.js";
import Users from "./pages/Users.js";
import { Layout } from "./ui/Layout.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { SingleBooking } from "./pages/SingleBooking.js";
import Cars from "./pages/Cars.js";
import { CheckIn } from "./pages/CheckIn.js";
import UserSettings from "./pages/UserSettings.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="font-roboto ">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:id" element={<SingleBooking />} />
              <Route path="cars" element={<Cars />} />
              <Route path="confirmation/:id" element={<CheckIn />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="user/:id" element={<UserSettings />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontSize: "1rem",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "text-gray-700",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
