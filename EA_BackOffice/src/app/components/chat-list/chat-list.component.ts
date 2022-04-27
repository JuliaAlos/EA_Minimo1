import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
  listChats: Chat[] = [];

  id: string | null = null;

  constructor(
    private _chatService: ChatService,
    private _userService: UserService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getChats();
  }

  getChats() {
    if (!this.id) {
      this._chatService.getChats().subscribe(
        (data) => {
          console.log({ Chats: data });
          this.listChats = data;
        },
        (error) => console.log(error)
      );
      return;
    }

    this._userService.getUser(this.id).subscribe(
      (data) => {
        this.listChats = data.chats;
      },
      (error) => console.log(error)
    );
  }

  deleteChat(chatId: string) {
    this._chatService.deleteChat(chatId).subscribe((data: any) => {
      this.toastr.success('Deleted Chat');
      this.getChats();
    });
  }

  parseMembers(chat: Chat): String {
    const user_names = chat.users.map((el: User) => el.name);
    return user_names.join(', ');
  }
}
