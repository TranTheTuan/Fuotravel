import {User} from './user';
import {Image} from './image';

export class Post {
  id: number;
  caption: string;
  vote: number;
  author: User;
  images?: Image[];
  // tslint:disable-next-line:variable-name
  created_at: string;
}
