import { useNavigate } from "react-router-dom";

const useNavigateBack = () => {
  const navigate = useNavigate();
  return () => navigate(-1);
};

export default useNavigateBack;
