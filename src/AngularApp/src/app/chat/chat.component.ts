import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chat', { static: false }) private main: ElementRef<HTMLElement>;
  messages: Message[] = [];
  text: string;
  private readonly connection: signalR.HubConnection;
  private readonly username = new Date().getTime().toString();

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .build();

    this.connection.on("receiveMessage", (user: string, text: string) => this.addMessage({ user, text }));

    this.connection.on("receiveNotification", (text: string) => this.addMessage({ user: "notification", text }));

    this.connection.start().catch(err => console.error(err));
  }

  ngOnInit() {
  }

  send() {
    this.connection.send("newMessage", this.username, this.text)
      .then(() => this.text = null);
  }

  private addMessage(message: Message) {
    message.time = new Date();
    this.messages.push(message);
    this.main.nativeElement.scrollTop = this.main.nativeElement.scrollHeight;
  }
}

export interface Message {
  user: string;
  text: string;
  time?: Date;
}