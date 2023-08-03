import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import style from "../styles/Signin.module.css";

const { container } = style;

export default function Signin() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (
      session?.user?.email === process.env.ADMIN_EMAIL_1 ||
      session?.user?.email === process.env.ADMIN_EMAIL_2
    ) {
      toast.success("success - redirecting");
      router.push("/admin/dashboard");
    }
    // handle non admin user signin-in with google OAuth
    else if (
      session?.user?.email &&
      (session?.user?.email !== process.env.ADMIN_EMAIL_1 ||
        session?.user?.email !== process.env.ADMIN_EMAIL_2)
    ) {
      toast.error("This account is not recognized. Signing out...");
      setTimeout(() => {
        signOut();
      }, 2000);
    }
  }, [session?.user?.email]);

  if (
    session &&
    (session?.user?.email === process.env.ADMIN_EMAIL_1 ||
      session?.user?.email === process.env.ADMIN_EMAIL_2)
  ) {
    return (
      <div className={container}>
        <h2>Admin sign-in page</h2>
        <p>Signed in as {session?.user?.email}</p> <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else if (
    session &&
    (session?.user?.email !== process.env.ADMIN_EMAIL_1 ||
      session?.user?.email !== process.env.ADMIN_EMAIL_2)
  )
    return (
      <div className={container}>
        <h2>Admin sign-in page</h2>
        <p>Wrong account. Not signed in</p> <br />
      </div>
    );
  else {
    return (
      <div className={container}>
        <h2>Admin sign-in page</h2>
        <p>Sign in with Google</p> <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }
}
