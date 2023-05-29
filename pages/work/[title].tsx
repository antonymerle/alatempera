import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Work, { IWork } from "@/models/works";
import dbConnect from "@/models/connection";
import { log } from "console";

const WorkDetails: React.FC<{ work: IWork }> = ({ work }) => {
  console.log({ work });

  return <div>{work.title}</div>;
};

export default WorkDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();

  const data = await Work.find({});

  const works: Array<IWork> = JSON.parse(JSON.stringify(data));

  const paths = works.map((work) => {
    return {
      params: {
        title: work.title,
      },
    };
  });

  console.log({ pathsExample: paths[0].params.title });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log({ params });

  await dbConnect();

  const data = await Work.find({ title: params!.title });
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
