import { FormEvent, useState } from "react";
import useLogin from "./hooks/useLogin";
import { BiLoaderAlt } from "react-icons/bi";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogin } = useLogin();

  const handleTest = () => {
    setEmail("test@mail.com");
    setPassword("123456");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <form
      className="w-[80vw] md:w-[550px] p-8 bg-transparent rounded-lg shadow-md border border-gray-200 bg-white"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-3 text-sm font-medium text-gray-900 lg:text-base"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@flowbite.com"
          required
          disabled={isLogin}
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="password"
          className="block mb-3 text-lg font-medium text-gray-900 lg:text-base"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          autoComplete="current-password "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLogin}
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm lg:text-base w-full px-5 py-3 text-center flex justify-center items-center "
        disabled={isLogin}
      >
        {!isLogin ? "Login" : <BiLoaderAlt className="w-6 h-6 animate-spin" />}
      </button>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm lg:text-base w-full px-5 py-3 mt-3 text-center flex justify-center items-center"
        disabled={isLogin}
        onClick={() => handleTest()}
      >
        {!isLogin ? "Test Application" : <BiLoaderAlt className="w-6 h-6 animate-spin" />}
      </button>
    </form>
  );
}

export default LoginForm;
