"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
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
    const userId = createUser(email, hashedPassword);
    await createAuthSession(userId);
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

export async function login(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = getUserByEmail(email);
  if (!existingUser) {
    return {
      errors: {
        email: "Email or Password is wrong .",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return {
      errors: {
        password: "Email or Password is wrong .",
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode, previousState, formData) {
  if (mode === "login") {
    return login(previousState, formData);
  }
  return signup(previousState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
