export type PostPreview = {
  title: string;
  description: string;
  previewImage: string;
  timestamp: number;
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

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ResMailer = {
  success: boolean;
  data: ContactMessage | null;
  error: string | null;
};

export interface IPicture {
  src: string;
  width: number;
  height: number;
  alt_fr: string;
  alt_en: string;
}

export type PrivilegeLevel = "user" | "admin";

export type WorkType = "original" | "print";
