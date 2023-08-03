import React from "react";
import { useRouter } from "next/router";

const Editor: React.FC<{ path: string }> = ({ path }) => {
  const { pathname: currentPathname } = useRouter();
  return <div>Editor</div>;
};

export default Editor;
