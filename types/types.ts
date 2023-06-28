export type PostPreview = {
  title: string;
  description: string;
  previewImage: string;
  slug: string;
};

export type ImageOrientation = "portrait" | "landscape" | "square";

export type SessionDetails = {
  sessionStatus?: string;
  customerFirstName?: string;
};

export type ISOCodes = {
  europeNoFR: string[];
  northAmerica: string[];
};
