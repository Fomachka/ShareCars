import supabase from "./supabase";

export const SignUp = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error?.message);
  }

  return data;
};

export const Login = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error?.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) {
    throw new Error(error?.message);
  }

  return data?.user;
};

export const Logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error?.message);
  }
};
