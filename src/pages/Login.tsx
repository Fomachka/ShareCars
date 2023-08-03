import LoginForm from "../features/authentication/LoginForm";

const Login = () => {
  return (
    <main className="h-screen flex flex-col gap-8 justify-center items-center bg-gray-100 ">
      <div className="text-center space-y-8">
        <picture>
          <source type="image/webp" srcSet="/images/logobig.webp" />
          <source type="image/png" srcSet="/images/logobig.png" />
          <img
            src="/images/logobig.png"
            alt="website logo"
            width={96}
            height={96}
            className="w-auto h-28  mx-auto"
          />
        </picture>
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
