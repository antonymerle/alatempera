import React from "react";
import Image from "next/image";
import { ImageOrientation } from "@/types/types";

const HeroImage = ({
  src,
  alt,
  orientation,
}: {
  src: string;
  alt: string;
  orientation: ImageOrientation;
}) => {
  console.log({ orientation });

  return (
    <div className={`mdx-hero-image mdx-hero-image-${orientation}`}>
      <Image src={src} alt={alt} fill={true}></Image>
    </div>
  );
};

export default HeroImage;
