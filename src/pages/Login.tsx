import LoginForm from "../features/authentication/LoginForm";

const Login = () => {
  return (
    <main className="h-screen flex flex-col gap-10 justify-center items-center bg-gray-100 ">
      {/* <img className="w-auto h-36 mx-auto" src="/images/logo-light.png" alt="Logo" /> */}
      <h1 className="text-gray-600 text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        Log in to your account
      </h1>
      <LoginForm />
    </main>
  );
};

export default Login;
