import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { PostPreview } from "@/types/types";
import Link from "next/link";
import DashboardPostsTable from "./DashboardPostsTable";
import Router from "next/router";

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
        <DashboardPostsTable posts={blogPosts} />
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
