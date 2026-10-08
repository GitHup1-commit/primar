"use server";

import { redirect } from "next/navigation";
import { buatKoneksiSesiAdmin } from "@/lib/supabase";

export async function loginAdmin(prevState, formData) {
  let email = "";
  let password = "";

  if (formData instanceof FormData) {
    email = formData.get("email");
    password = formData.get("password");
  } else if (prevState instanceof FormData) {
    email = prevState.get("email");
    password = prevState.get("password");
  }

  const emailStr = String(email || "").trim();
  const passwordStr = String(password || "");

  if (!emailStr || !passwordStr) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await buatKoneksiSesiAdmin();
  const { error } = await supabase.auth.signInWithPassword({
    email: emailStr,
    password: passwordStr,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Email atau password salah." };
    }
    return { error: error.message || "Gagal masuk. Silakan coba lagi." };
  }

  redirect("/admin");
}

export async function keluarAdmin() {
  const supabase = await buatKoneksiSesiAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

