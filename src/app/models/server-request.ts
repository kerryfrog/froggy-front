export interface Post {
  title: string;
  contents: string;
  htmlContents: string;
}

export interface UserPrefer {
  proficiency: number;
  crochet: number;
  knitting: number;
}

export interface Review {
  rating: number;
  contents: string;
}
