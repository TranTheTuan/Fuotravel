import {environment} from '../../../environments/environment';
import {Tag} from './tag';

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
  members_quantity: number;
  // tslint:disable-next-line:variable-name
  user_id: number;
  status: boolean;
  tags: Tag[];
}
