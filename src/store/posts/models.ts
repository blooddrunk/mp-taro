export type Post = {
  id: number | string;
  title: string;
  author?: string;
  updatedAt: Date;
  description?: string;
  thumbnail?: string;
};

export type PostRequest = {
  shouldClearItems: boolean;
};

export type PostResponse = {
  items: Post[];
  total: number;
};
