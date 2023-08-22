import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { PostPreview } from "@/types/types";
import Link from "next/link";
import DashboardPostsTable from "./DashboardPostsTable";
import Router from "next/router";
import style from "../styles/Dashboard.module.css";

const { container } = style;

const Dashboard = () => {
  const { data: session } = useSession();
  const [blogPosts, setBlogPosts] = useState(Array<PostPreview>);

  useEffect(() => {
    if (session)
      fetch("/api/admin/dashboard")
        .then((res) => res.json())
        .then((data) => setBlogPosts(data));
    else {
      setTimeout(() => {
        Router.push("/");
      }, 2000);
    }
  }, []);

  return (
    <div>
      {session ? (
        <div className={container}>
          <h2>Administration du site</h2>
          <h3>Créer un nouveau post</h3>
          <Link href={"/admin/create/newPost"}>
            <button>Créer un nouveau post</button>
          </Link>
          <h3>Editer un post existant</h3>
          <DashboardPostsTable posts={blogPosts} />
        </div>
      ) : (
        <div>
          <h2>Unauthorized</h2>
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
