import { FormEvent, useState } from "react";
import useLogin from "./hooks/useLogin";
import { BiLoaderAlt } from "react-icons/bi";

function LoginForm() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("123456");
  const { login, isLogin } = useLogin();

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
    <form className="w-[500px] p-8 bg-white rounded-lg" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@flowbite.com"
          required
          disabled={isLogin}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLogin}
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base w-full px-5 py-3 text-center flex justify-center items-center"
        disabled={isLogin}
      >
        {!isLogin ? "Login" : <BiLoaderAlt className="w-6 h-6 animate-spin" />}
      </button>
    </form>
  );
}

export default LoginForm;
