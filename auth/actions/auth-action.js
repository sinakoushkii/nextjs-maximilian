"use server";

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
}
