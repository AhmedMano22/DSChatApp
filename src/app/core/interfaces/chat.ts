import { Timestamp } from '@angular/fire/firestore';
import { ProfileUser } from './ProfileUser';

export interface Chat {
  id: string;
  lastMessage?: string;
  lastMessageDate?: Date & Timestamp;
  userIds: string[];
  users: ProfileUser[];
  chatPic?: string;
  chatName?: string;
  unreadMessagesCount?: { [key: string]: number };
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  date: Date & Timestamp;
  imageUrl?: string;
  caption?: string;
  edited?: boolean;
  reactions?: { [emoji: string]: string[] };
  showReactions?: boolean;
}
