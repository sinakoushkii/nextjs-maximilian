"use server";

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if ((email && !email.includes("@")) || !email) {
    errors.email = "Please enter a valid email address .";
  }
  if (password.length < 5) {
    errors.password = "Password must be at least 5 characters .";
  }
  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    createUser(email, hashedPassword);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "The entered email already exists .",
        },
      };
    }
    throw error;
  }
}
