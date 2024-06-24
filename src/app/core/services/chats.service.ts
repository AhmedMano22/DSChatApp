import { uploadBytes } from '@firebase/storage';
import { uploadBytesResumable } from '@firebase/storage';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { Observable, concatMap, from, map, switchMap, take } from 'rxjs';
import { UsersService } from './users.service';

import { ProfileUser } from '../interfaces/ProfileUser';
import { Chat, Message } from '../interfaces/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  constructor(
    private firestore: Firestore,
    private userService: UsersService,
    private storage: Storage
  ) {}

  createChat(desiredUser: ProfileUser): Observable<string> {
    const ref = collection(this.firestore, 'chats');
    return this.userService.currentUserProfile$.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          userIds: [user?.uid, desiredUser?.uid],
          users: [
            {
              displayName: user?.displayName ?? '',
              photoURL: user?.photoURL ?? '',
            },
            {
              displayName: desiredUser?.displayName ?? '',
              photoURL: desiredUser?.photoURL ?? '',
            },
          ],
        })
      ),
      map((ref) => ref.id)
    );
  }

  //To get all chats displayed in chat list and real-time order it based on the last message date.
  get myChats$(): Observable<Chat[]> {
    const ref = collection(this.firestore, 'chats');
    return this.userService.currentUserProfile$.pipe(
      concatMap((user) => {
        if (!user?.uid) {
          throw new Error('User UID is not defined');
        }
        const myQuery = query(
          ref,
          where('userIds', 'array-contains', user.uid)
        );
        return collectionData(myQuery, { idField: 'id' }).pipe(
          map((chats) => this.addNamePic(user.uid, chats as Chat[])),
          //sort chat list based on last message date
          map((chats) =>
            chats.sort(
              (a, b) =>
                (b.lastMessageDate?.toMillis() ?? 0) -
                (a.lastMessageDate?.toMillis() ?? 0)
            )
          )
        ) as Observable<Chat[]>;
      })
    );
  }

  addNamePic(currentUserId: string, chats: Chat[]): Chat[] {
    chats.forEach((chat: Chat) => {
      const otherUserIndex =
        chat.userIds.indexOf(currentUserId ?? '') === 0 ? 1 : 0;
      const { displayName, photoURL } = chat.users[otherUserIndex];
      chat.chatName = displayName;
      chat.chatPic = photoURL;
    });
    return chats; // Return the updated chats array
  }

  getChatMessages$(chatId: string): Observable<Message[]> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const queryAll = query(ref, orderBy('date', 'asc'));
    return collectionData(queryAll) as Observable<Message[]>;
  }

  uploadImage(file: File): Observable<string> {
    const filePath = `chat_images/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);

    return from(uploadBytes(storageRef, file)).pipe(
      switchMap((snapshot) => getDownloadURL(snapshot.ref))
    );
  }

  isExistingChat(desiredUser: string): Observable<string | null> {
    return this.myChats$.pipe(
      take(1),
      map((chats) => {
        for (let i = 0; i < chats.length; i++) {
          if (chats[i].userIds.includes(desiredUser)) {
            return chats[i].id;
          }
        }
        return null;
      })
    );
  }

  uploadImageWithProgress(file: File): Observable<number | string> {
    const filePath = `chat_images/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable<number | string>((observer) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          observer.next(progress);
        },
        (error) => {
          observer.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            observer.next(downloadURL);
            observer.complete();
          });
        }
      );
    });
  }

  addChatMessage(
    chatId: string,
    message: string,
    imageUrl: string = ''
  ): Observable<any> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const chatRef = doc(this.firestore, 'chats', chatId);
    const today = Timestamp.fromDate(new Date());

    return this.userService.currentUserProfile$.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          text: message,
          senderId: user?.uid,
          date: today,
          imageUrl: imageUrl,
        })
      ),
      concatMap((docRef) => {
        // Get the newly generated document ID
        const messageId = docRef.id;
        // Update the document with the ID included
        return updateDoc(
          doc(this.firestore, 'chats', chatId, 'messages', messageId),
          { id: messageId }
        );
      }),
      concatMap(() =>
        updateDoc(chatRef, {
          lastMessage: message || 'Image',
          lastMessageDate: today,
        })
      )
    );
  }

  updateChatMessage(
    chatId: string,
    messageId: string,
    newText: string
  ): Observable<void> {
    const messageRef = doc(
      this.firestore,
      `chats/${chatId}/messages/${messageId}`
    );
    return from(updateDoc(messageRef, { text: newText, edited: true }));
  }

  deleteChatMessage(chatId: string, messageId: string): Observable<void> {
    const messageRef = doc(
      this.firestore,
      `chats/${chatId}/messages/${messageId}`
    );
    const chatRef = doc(this.firestore, 'chats', chatId);

    return from(deleteDoc(messageRef)).pipe(
      switchMap(() => {
        // Fetch the latest message after deletion
        const messagesRef = collection(
          this.firestore,
          `chats/${chatId}/messages`
        );
        const latestMessageQuery = query(
          messagesRef,
          orderBy('date', 'desc'),
          limit(1)
        );
        return collectionData(latestMessageQuery, {
          idField: 'id',
        }) as Observable<Message[]>;
      }),
      concatMap((latestMessages) => {
        let lastMessage = '';
        let lastMessageDate = null;

        if (latestMessages.length > 0) {
          lastMessage = latestMessages[0].text || 'Image';
          lastMessageDate = latestMessages[0].date;
        }

        // Update the chat document with the new last message and date
        return updateDoc(chatRef, {
          lastMessage,
          lastMessageDate,
        });
      })
    );
  }

  // Increment unread messages count for the receiver
  incrementUnreadCount(chatId: string, receiverId: string): Observable<void> {
    const chatRef = doc(this.firestore, 'chats', chatId);
    return from(
      updateDoc(chatRef, {
        [`unreadMessagesCount.${receiverId}`]: increment(1),
      })
    );
  }

  // Reset unread messages count for the current user
  resetUnreadCount(chatId: string, userId: string): Observable<void> {
    const chatRef = doc(this.firestore, 'chats', chatId);
    return from(updateDoc(chatRef, { [`unreadMessagesCount.${userId}`]: 0 }));
  }

  addReaction(
    chatId: any,
    messageId: string,
    emoji: string,
    userId: string
  ): Observable<void> {
    const messageRef = doc(
      this.firestore,
      `chats/${chatId}/messages/${messageId}`
    );
    const reactionField = `reactions.${emoji}`;

    return from(updateDoc(messageRef, { [reactionField]: arrayUnion(userId) }));
  }

  removeReaction(
    chatId: any,
    messageId: string,
    emoji: string,
    userId: string
  ): Observable<void> {
    const messageRef = doc(
      this.firestore,
      `chats/${chatId}/messages/${messageId}`
    );
    const reactionField = `reactions.${emoji}`;

    return from(
      updateDoc(messageRef, { [reactionField]: arrayRemove(userId) })
    );
  }
}
