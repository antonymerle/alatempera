import { GetStaticProps, GetStaticPaths } from "next";
import dbConnect from "@/models/connection";
import Work from "@/models/works";
import { ICartItem } from "@/context/StateContext";
import Product from "@/components/Product";

const WorkDetails: React.FC<{ work: ICartItem }> = ({ work }) => {
  return <Product product={work} />;
};

export default WorkDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();

  const data = await Work.find({});

  const works: Array<ICartItem> = JSON.parse(JSON.stringify(data));

  const paths = works.map((work) => {
    return {
      params: {
        title: work.title_fr,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log({ params });

  await dbConnect();

  console.log("*** getStaticProps ****");

  const data = await Work.find({ title_fr: params!.title });
  console.log({ data });

  const work = JSON.parse(JSON.stringify(data))[0];

  if (!work) {
    return {
      notFound: true, // redirects to 404 page
    };
  }

  return {
    props: {
      work: work,
    },
  };
};
