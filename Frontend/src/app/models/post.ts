import {User} from './user';

export class Post {
  id: number;
  caption: string;
  vote: number;
  user: User;
  // tslint:disable-next-line:variable-name
  created_at: string;
}
