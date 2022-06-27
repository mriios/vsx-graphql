export type MonthData = [MonthCount[], MonthCount[]];

export type MonthCount = {
  month: number;
  count: number;
}

export type Post = {
  createdAt: string;
  id: string;
  likelyTopics: LikelyTopics[];
  published: boolean;
}

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PostWithAuthor extends Post {
  author: Author;
}

export type PostDataWithAuthor = {
  allPosts: PostWithAuthor[]
}