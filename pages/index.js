import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import useSWR from "swr";
import axios from "axios";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    "https://icanhazdadjoke.com",
    fetcher
  );
  console.log("🚀 ~ file: index.js:31 ~ Home ~ data:", data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className="title">
          Read <Link href="/posts/first-post">this page!</Link>
        </h1>
        <h1>
          fetch data <Link href="/posts/second-post">onClick</Link>
        </h1>
        <h1>
          Fetch data with <Link href="/posts/third-post-swr">swr</Link>
        </h1>
        <h3>Joke of the day...</h3>
        <p>{data.joke}</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
