import confetti from "canvas-confetti";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { PostPreview } from "@/types/types";

export const runFireworks = () => {
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  var interval: NodeJS.Timer = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

export const getBlogPostPreviews = async (): Promise<PostPreview[]> => {
  // get all MDX files
  const postFilePaths = fs
    .readdirSync("_posts")
    .filter(
      (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
    );

  let postPreviews: PostPreview[] = [];

  // read frontmatter for each blog post
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`_posts/${postFilePath}`, "utf-8");

    // serialize the MDX content into JSX and parse the frontmatter
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost?.frontmatter,
      // add the slug to the frontmatter data
      slug: `/blog/${postFilePath.replace(".mdx", "")}`,
    } as PostPreview);
  }
  return postPreviews;
};
