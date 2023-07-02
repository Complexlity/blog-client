export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: Pick<User, 'name' | '_id'>;
  published: boolean;
  comments: Omit<Comment, 'updatedAt' | 'post'>[];
  likes: string[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface Comment {
  _id: string
  comment: string
  user: Pick<User, 'name' | '_id'>
  post: string
  likes: string[]
  likeCount: number
    createdAt: number
    updatedAt: number
}