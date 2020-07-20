import {Tag} from './tag';

export class User {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  accessToken?: string;
  tags: Tag[];
  roomData: {
    plan: [number],
    post: [number],
    comment: [number],
    friend: [number],
    pendingFriend: [number]
  };
}
