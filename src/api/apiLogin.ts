import { UserAttributes } from "@supabase/supabase-js";
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

export const updateUserSettings = async ({
  password,
  firstName,
  lastName,
  avatar,
}: {
  password?: string;
  firstName: string;
  lastName: string;
  avatar: File | null;
}) => {
  let updateData;

  if (password) updateData = { password };
  if (firstName || lastName) updateData = { data: { firstName, lastName } };

  const { data, error } = await supabase.auth.updateUser(updateData as UserAttributes);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadingError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadingError) throw new Error(uploadingError.message);

  const { data: updatedInfo, error: updatingError } = await supabase.auth.updateUser({
    data: {
      avatar: `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updatingError) throw new Error(updatingError.message);

  return updatedInfo;
};
