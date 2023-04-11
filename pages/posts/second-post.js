import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";

export default function FirstPost({ allAPIData }) {
  const [users, setUsers] = useState([]);

  const callAPI = async () => {
    try {
      const res = await fetch(`https://randomuser.me/api/?results=30`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setUsers(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (allAPIData) {
      setUsers(allAPIData.results);
    }
  }, [allAPIData]);

  return (
    <Layout>
      <Head>
        <title>First Post hello world</title>
      </Head>

      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      <div>
        <main>
          <button onClick={callAPI}>Make API call</button>
        </main>
      </div>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.login.sha256}>
              {user.name.first} {user.name.last}{" "}
              <img src={user.picture.thumbnail} alt="user portrait" />
            </li>
          ))}
      </ul>
    </Layout>
  );
}
