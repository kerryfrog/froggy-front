export interface Post {
  title: string;
  category: string;
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

export interface Paging {
  curPage?: number;
  page_list_size?: number;
  page_size?: number;
  totalPage?: number;
  offset?: number;
  startPage?: number;
  endPage?: number;
  tot_cnt?: number;
}
