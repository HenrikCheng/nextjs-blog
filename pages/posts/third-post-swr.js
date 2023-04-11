import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

export default function FirstPost() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    "https://randomuser.me/api/?results=30",
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout>
      <Head>
        <title>Third Post hello world</title>
      </Head>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <ul>
        {data &&
          data.results.map((user) => (
            <li key={user.login.sha256}>
              {user.name.first} {user.name.last}{" "}
              <img src={user.picture.thumbnail} alt="user portrait" />
            </li>
          ))}
      </ul>
    </Layout>
  );
}
