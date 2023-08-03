import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { PostPreview } from "@/types/types";
import Link from "next/link";
import DashboardPostsTable from "./DashboardPostsTable";

const Dashboard = () => {
  const { data: session } = useSession();
  const [blogPosts, setBlogPosts] = useState(Array<PostPreview>);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data));
  }, []);

  return (
    <div>
      {/* <ul>{posts}</ul> */}
      <DashboardPostsTable posts={blogPosts} />
    </div>
  );
};

export default Dashboard;
