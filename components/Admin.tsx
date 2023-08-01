import { useSession, signIn, signOut } from "next-auth/react";

const Admin = () => {
  const { data: session } = useSession();

  return <div>Admin</div>;
};

export default Admin;
