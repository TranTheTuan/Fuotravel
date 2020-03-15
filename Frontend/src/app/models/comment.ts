export class Comment {
  id: number;
  content: string;
  replies?: Comment[];
  vote: number;
  image: string;
  // tslint:disable-next-line:variable-name
  parent_id?: number;
}
