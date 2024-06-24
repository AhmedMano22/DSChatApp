import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Chat, Message } from 'src/app/core/interfaces/chat';
import { ChatsService } from 'src/app/core/services/chats.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ImageUploadProgressDialogComponent } from '../image-upload-progress-dialog/image-upload-progress-dialog.component';
import {
  map,
  Observable,
  of,
  switchMap,
  take,
  combineLatest,
  startWith,
} from 'rxjs';
import { ProfileUser } from 'src/app/core/interfaces/ProfileUser';
import { FormControl } from '@angular/forms';
import { UserListDialogComponent } from '../user-list-dialog/user-list-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewChecked {
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private usersService: UsersService,
    private chatsService: ChatsService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  searchControl = new FormControl('');
  chatListControl = new FormControl('');
  messageControl = new FormControl('');

  showEmojiPicker = false;
  availableEmojis = [
    { name: 'like', svgPath: '../../../assets/images/reactions/like.svg' },
    { name: 'love', svgPath: '../../../assets/images/reactions/love.svg' },
    {
      name: 'laugh',
      svgPath: '../../../assets/images/reactions/laugh-svg.svg',
    },
    { name: 'wow', svgPath: '../../../assets/images/reactions/wow.svg' },
    { name: 'sad', svgPath: '../../../assets/images/reactions/sad.svg' },
    { name: 'clap', svgPath: '../../../assets/images/reactions/clap.svg' },
  ];

  getAvailableReactions(): { name: string; svgPath: string }[] {
    return this.availableEmojis;
  }

  toggleReactionsVisibility(message: Message): void {
    message.showReactions = !message.showReactions;
  }

  getTotalReactionsCount(message: Message): number {
    const reactions = message.reactions ?? {};
    return Object.values(reactions).reduce(
      (acc, curr) => acc + (curr?.length || 0),
      0
    );
  }

  getReactionCount(message: Message, emoji: string): number {
    return message.reactions?.[emoji]?.length || 0;
  }

  getUserReactionSvgPaths(message: Message): string[] {
    if (!message.reactions) return [];

    const allReactions: string[] = [];
    Object.keys(message.reactions).forEach((emoji) => {
      if (message.reactions && message.reactions[emoji]) {
        const emojiSvgPath = this.getAvailableReactions().find(
          (e) => e.name === emoji
        )?.svgPath;
        if (emojiSvgPath) {
          message.reactions[emoji].forEach((userId) => {
            allReactions.push(emojiSvgPath);
          });
        }
      }
    });

    return allReactions;
  }

  getUserReaction(userId: string, message: Message): string | null {
    const reactions = message.reactions || {};
    const userReaction = Object.keys(reactions).find((emoji) =>
      reactions[emoji]?.includes(userId)
    );

    if (!userReaction) {
      for (const emoji of Object.keys(reactions)) {
        if (reactions[emoji]?.length > 0) {
          return emoji;
        }
      }
    }

    return userReaction || null;
  }

  getUserReactionSvgPath(userId: string, message: Message): string | null {
    const userReaction = this.getUserReaction(userId, message);
    if (userReaction) {
      const emoji = this.availableEmojis.find((e) => e.name === userReaction);
      return emoji ? emoji.svgPath : null;
    }
    return null;
  }

  reactToMessage(message: Message, emoji: string): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        const userId = user.uid;
        const chatId = this.chatListControl.value;
        const currentReaction = this.getUserReaction(userId, message);

        if (currentReaction === emoji) {
          this.chatsService
            .removeReaction(chatId, message.id, emoji, userId)
            .subscribe();
        } else {
          if (currentReaction) {
            this.chatsService
              .removeReaction(chatId, message.id, currentReaction, userId)
              .subscribe(() => {
                this.chatsService
                  .addReaction(chatId, message.id, emoji, userId)
                  .subscribe();
              });
          } else {
            this.chatsService
              .addReaction(chatId, message.id, emoji, userId)
              .subscribe();
          }
        }
      }
    });
  }

  user$ = this.usersService.currentUserProfile$;
  users$ = combineLatest([
    this.usersService.allUsers$,
    this.user$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, user, searchString]) => {
      return users.filter(
        (u) =>
          u.displayName
            ?.toLowerCase()
            .includes(searchString?.toLowerCase() ?? '') && u.uid !== user?.uid
      );
    })
  );

  myChats$ = this.chatsService.myChats$;
  selectedChatId: string | null = null;
  selectChat(chatId: string) {
    this.chatListControl.setValue(chatId);
    this.selectedChatId = chatId;
  }

  filteredChats$ = combineLatest([
    this.myChats$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([chats, searchString]) =>
      chats.filter((chat) =>
        chat.chatName!.toLowerCase().includes(searchString!.toLowerCase())
      )
    )
  );

  openUserList() {
    const dialogRef = this.dialog.open(UserListDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((user: ProfileUser) => {
      if (user) {
        this.createChat(user);
      }
    });
  }

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges.pipe(startWith('')),
    this.myChats$,
  ]).pipe(
    switchMap(([chatId, chats]) => {
      if (chatId) {
        const selectedChat = chats.find((c) => c.id === chatId);
        return this.user$.pipe(
          take(1),
          switchMap((user) => {
            if (selectedChat && user) {
              return this.chatsService
                .resetUnreadCount(selectedChat.id, user.uid)
                .pipe(map(() => selectedChat));
            }
            return of(null);
          })
        );
      }
      return of(null);
    })
  );

  messages$: Observable<Message[]> | undefined;
  contextMenuStyle = { top: '0px', left: '0px' };
  showContextMenu = false;
  selectedMessage: Message | null = null;

  ngOnInit(): void {
    this.messages$ = this.chatListControl.valueChanges.pipe(
      switchMap((chatId) => {
        return this.user$.pipe(
          take(1),
          switchMap((user) => {
            if (chatId && user) {
              this.chatsService.resetUnreadCount(chatId, user.uid).subscribe();
              return this.chatsService.getChatMessages$(chatId);
            }
            return of([]);
          })
        );
      })
    );

    this.messages$.subscribe(() => {});
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.isClickInsideEmojiPicker(event)) {
      this.showEmojiPicker = false;
    }
    this.showContextMenu = false;
  }

  private isClickInsideEmojiPicker(event: MouseEvent): boolean {
    const emojiPicker = document.querySelector('.emoji-picker');
    if (!emojiPicker) return false;
    return emojiPicker.contains(event.target as Node);
  }

  onRightClick(event: MouseEvent, message: Message) {
    event.preventDefault();
    this.selectedMessage = message;
    this.contextMenuStyle = {
      top: `${event.clientY}px`,
      left: `${event.clientX}px`,
    };
    this.showContextMenu = true;
  }

  createChat(user: ProfileUser) {
    this.chatsService
      .isExistingChat(user.uid)
      .pipe(
        switchMap((chatId) => {
          if (!chatId) {
            return this.chatsService.createChat(user);
          } else {
            return of(chatId);
          }
        })
      )
      .subscribe((chatId) => {
        this.chatListControl.setValue(chatId);
      });
  }

  sendMessage(): void {
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value;
    const imageUrl = '';

    if (!message || !selectedChatId) return;
    this.user$.pipe(take(1)).subscribe((user) => {
      if (selectedChatId) {
        this.chatsService
          .resetUnreadCount(selectedChatId, user!.uid)
          .subscribe();
      }
      if (this.selectedMessage?.id) {
        this.chatsService
          .updateChatMessage(selectedChatId, this.selectedMessage.id, message)
          .subscribe(() => {
            this.clearMessageControls();
          });
      } else {
        this.chatsService
          .addChatMessage(selectedChatId, message, imageUrl)
          .subscribe(() => {
            this.clearMessageControls();
            this.myChats$
              .pipe(
                take(1),
                map((chats) =>
                  chats.find((chat) => chat.id === selectedChatId)
                ),
                map((chat) => {
                  if (user && chat) {
                    const receiverId = this.getReceiverId(chat, user.uid);
                    if (receiverId) {
                      this.chatsService
                        .incrementUnreadCount(selectedChatId, receiverId)
                        .subscribe();
                    }
                  }
                })
              )
              .subscribe();
          });
      }
    });
  }

  private getReceiverId(chat: Chat, currentUserId: string): string | undefined {
    return chat.userIds.find((id) => id !== currentUserId);
  }

  private clearMessageControls(): void {
    this.messageControl.setValue('');
    this.selectedMessage = null;
  }

  editMessage(): void {
    if (!this.selectedMessage) return;
    this.messageControl.setValue(this.selectedMessage.text);
    this.isEditing = true;
    this.showContextMenu = false;
  }

  doneEditing(): void {
    this.sendMessage();
    this.isEditing = false;
  }

  clearEditing(): void {
    this.messageControl.setValue('');
    this.selectedMessage = null;
    this.isEditing = false;
  }

  selectImage() {
    this.imageInput.nativeElement.click();
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const dialogRef = this.dialog.open(ImageUploadProgressDialogComponent, {
        data: { file: file, caption: this.messageControl.value || '' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const { imageUrl, caption } = result;
          const selectedChatId = this.chatListControl.value;
          if (selectedChatId) {
            this.chatsService
              .addChatMessage(selectedChatId, caption, imageUrl)
              .subscribe(() => {
                this.messageControl.setValue('');
              });
          }
        }
      });
    }
  }

  confirmDeleteMessage() {
    if (this.selectedMessage) {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '250px',
        data: { message: this.selectedMessage.text },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          const selectedChatId = this.chatListControl.value;
          if (selectedChatId) {
            this.chatsService
              .deleteChatMessage(selectedChatId, this.selectedMessage!.id)
              .subscribe(() => {
                this.selectedMessage = null;
              });
          }
        }
        this.showContextMenu = false;
      });
    }
  }

  isEditing = false;
  cancelEdit(): void {
    this.clearMessageControls();
  }

  canEditOrDelete(message: Message, currentUserUid: string): boolean {
    return message.senderId === currentUserUid;
  }

  toggleEmojiPicker(event: Event): void {
    event.stopPropagation();
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: EmojiEvent): void {
    const emoji = event.emoji.native;
    const currentMessage = this.messageControl.value || '';
    this.messageControl.setValue(currentMessage + emoji);
  }
}
