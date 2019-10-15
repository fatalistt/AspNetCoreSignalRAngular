import { Component, OnInit } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  text: string;
  private readonly connection: signalR.HubConnection;
  private readonly username = new Date().getTime().toString();

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .build();

    this.connection.on("messageReceived", (user: string, text: string) => {
      return this.messages.push({user, text});
    });

    this.connection.start().catch(err => console.error(err));
  }

  ngOnInit() {
  }

  send() {
    this.connection.send("newMessage", this.username, this.text)
      .then(() => this.text = null);
  }
}

export interface Message {
  user: string;
  text: string;
}