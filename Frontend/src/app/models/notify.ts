import {User} from './user';

export class Notify {
  id: number;
  sender: User;
  message: string;
  roomId: number;
  roomType: string;
}
