import { GetStaticProps } from "next";
import { PostPreview } from "@/types/types";
import LandingBlog from "@/components/blog/LandingBlog";
import { getBlogPostPreviews } from "@/utils/lib";

const blog: React.FC<{ postPreviews: PostPreview[] }> = ({ postPreviews }) => {
  return <LandingBlog postPreviews={postPreviews} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const postPreviews = await getBlogPostPreviews();
  return {
    props: {
      postPreviews,
    },
    // enable ISR
    revalidate: 60,
  };
};

export default blog;
