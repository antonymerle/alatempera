import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { PostPreview } from "@/types/types";
import Link from "next/link";
import AdminPostsTable from "./AdminPostsTable";

const Admin = () => {
  const { data: session } = useSession();
  const [blogPosts, setBlogPosts] = useState(Array<PostPreview>);

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data));
  }, []);

  return (
    <div>
      {/* <ul>{posts}</ul> */}
      <AdminPostsTable posts={blogPosts} />
    </div>
  );
};

export default Admin;
