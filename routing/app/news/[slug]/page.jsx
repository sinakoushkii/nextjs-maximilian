import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import React from "react";

const NewsItem = ({ params }) => {
  const slug = params.slug;
  const newsItem = DUMMY_NEWS.find((news) => news.slug === slug);

  return (
    <article className="news-article">
      <header>
        <Image src={`/images/news/${newsItem.image}`} width={120} height={120} />
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsItem;
