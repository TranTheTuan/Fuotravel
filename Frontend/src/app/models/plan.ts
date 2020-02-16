import {environment} from '../../environments/environment';

export class Plan {
  id: number;
  title: string;
  description: string;
  cover: string;
  departure: string;
  // tslint:disable-next-line:variable-name
  start_at: string;
  destination: string;
  // tslint:disable-next-line:variable-name
  arrival_at: string;
  // tslint:disable-next-line:variable-name
  member_quantity: number;
  // tslint:disable-next-line:variable-name
  user_id: number;
  // tslint:disable-next-line:variable-name
  group_id: number;
  get coverUrl(): string {
    return 'a';
  }
}
