import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <main className="h-screen flex flex-col gap-10 justify-center items-center bg-gray-100">
      <img className="w-auto h-36 mx-auto" src="/images/logo-light.png" alt="Logo" />
      <h1 className="text-gray-600 text-3xl font-semibold">Log in to your account</h1>
      <LoginForm />
    </main>
  );
}

export default Login;
