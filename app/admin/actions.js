"use server";

import { redirect } from "next/navigation";
import { buatKoneksiSesiAdmin } from "@/lib/supabase";

export async function periksaAdminLogin() {
  const supabase = await buatKoneksiSesiAdmin();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return { supabase, user };
}

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

export async function gantiPassword(prevState, formData) {
  let passwordBaru = "";
  let konfirmasiPassword = "";

  if (formData instanceof FormData) {
    passwordBaru = formData.get("password_baru");
    konfirmasiPassword = formData.get("konfirmasi_password");
  } else if (prevState instanceof FormData) {
    passwordBaru = prevState.get("password_baru");
    konfirmasiPassword = prevState.get("konfirmasi_password");
  }

  const passStr = String(passwordBaru || "");
  const konfStr = String(konfirmasiPassword || "");

  if (!passStr || !konfStr) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (passStr.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passStr !== konfStr) {
    return { error: "Password baru dan konfirmasi password harus sama." };
  }

  // Wajib periksa di server bahwa admin sudah login
  const sesi = await periksaAdminLogin();
  if (!sesi) {
    return { error: "Anda harus login terlebih dahulu untuk mengganti password." };
  }

  const { error } = await sesi.supabase.auth.updateUser({
    password: passStr,
  });

  if (error) {
    return { error: error.message || "Gagal mengganti password." };
  }

  return { success: true, message: "Password berhasil diganti." };
}

export const gantiPasswordAdmin = gantiPassword;
