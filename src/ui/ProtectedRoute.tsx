import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/hooks/useUser";
import { Loading } from "./Loading";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <main className="h-screen w-full flex justify-center items-center bg-white">
        <Loading />
      </main>
    );
  }

  if (isAuthenticated) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;
