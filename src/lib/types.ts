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
  imageSrc: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: Pick<User, 'name' | '_id' | 'imageSrc'>;
  published: boolean;
  coverImageSource?: string
  comments: OmittedComment[];
  likes: string[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface Comment {
  _id: string
  comment: string
  user: Pick<User, 'name' | '_id' | 'imageSrc'>
  post: string
  likes: string[]
  likeCount: number
    createdAt: string
    updatedAt: string
}

export type OmittedComment = Omit<Comment, "updatedAt" | "post">;