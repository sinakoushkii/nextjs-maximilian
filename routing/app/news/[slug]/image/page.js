import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import React from "react";

const NewsImagePage = ({ params }) => {
  const newsSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="full-screen">
      <img src={`/images/news/${newsItem.image}`} />
    </div>
  );
};

export default NewsImagePage;
