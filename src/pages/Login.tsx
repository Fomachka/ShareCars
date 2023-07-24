import LoginForm from "../features/authentication/LoginForm";

const Login = () => {
  return (
    <main className="h-screen flex flex-col gap-8 justify-center items-center bg-gray-100 ">
      <div className="text-center space-y-8">
        <img className="w-auto h-28  mx-auto" src="/images/logobig.png" alt="Logo" />
        <h1 className="text-gray-600 text-xl sm:text-2xl font-semibold ">
          Welcome to ShareCars!
        </h1>
      </div>
      <div className="space-y-6">
        <p className="text-blue-500 font-semibold rounded-md text-center">
          Log in to begin your journey
        </p>
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
