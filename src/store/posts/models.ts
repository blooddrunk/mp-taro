export type Post = {
  id: number | string;
  title: string;
  author?: string;
  updatedAt: Date;
  description?: string;
  thumbnail?: string;
};

export type PostResponse = {
  items: Post[];
  total: number;
};
