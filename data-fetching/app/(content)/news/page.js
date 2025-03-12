import NewsList from '@/components/news-list';
import { getAllNews } from '@/lib/news';

export default function NewsPage() {
  //The code below doesnt work on client-side for the security reasons and by the help of server components in Next.js apps we can return data dircetly from the database
  const news=getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
