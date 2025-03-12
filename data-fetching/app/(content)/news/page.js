import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  //The code below doesnt work on client-side for the security reasons and by the help of server components in Next.js apps we can return data dircetly from the database
  // This is the best way to access to data if we own the database but if we dont have access to database server-side fetching is the best approach
  const news = await getAllNews();
  // because we simulate an async operation in the lib folder we now use await keyword but if dont simulaten we dont need an async keyword

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
