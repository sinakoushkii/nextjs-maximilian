import { logout } from "@/actions/auth-action";
import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function RootAuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          <p>Welcome back!</p>
          <form action={logout}>
            <button>Log out</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
