import { supabase } from "../config/supabase.js";

export const submitContact = async (contactData) => {
  const { email, phone } = contactData;

  if (!email || !phone) {
    throw new Error("Email and phone are required");
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert([{ email, phone }])
    .select();

  if (error) throw error;

  return data[0];
};