import Link from 'next/link'
import React from 'react'

const NewsPage = () => {
  return (
    <div>
        <p>
            <Link href="/news/first-news">News Item One</Link>
        </p>
        <p>
            <Link href="/news/second-news">News Item two</Link>
        </p>
        <p>
            <Link href="/news/third-news">News Item three</Link>
        </p>
    </div>
  )
}

export default NewsPage