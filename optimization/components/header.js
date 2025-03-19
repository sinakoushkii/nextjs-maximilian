import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src={logo}
          width={100}
          height={100}
          // sizes="10vw" //when you need different sizes for different screens you can use sizes property
          priority //if we add the priority prop, the image will be loaded as a priority and lazy loading will be disabled
          alt="header-logo"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
