import supabase from "./supabase";

export const login = async function ({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export async function getCurrentUser() {
  // Get the current user session from local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // Get user details from supabase if the current session is valid
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
