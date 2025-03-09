import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-start items-center gap-1">
          <Link href="/">Home</Link>
          <Link href="/news">News</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
