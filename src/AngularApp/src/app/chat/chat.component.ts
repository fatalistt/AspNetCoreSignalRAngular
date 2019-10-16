import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chat', { static: false }) private main: ElementRef<HTMLElement>;
  text: string;
  groups: string[] = [];
  readonly messages: Message[] = [];
  private readonly connection: signalR.HubConnection;
  private readonly username = new Date().getTime().toString();
  private currentGroup: string;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .build();

    this.connection.on("receiveMessage", (user: string, text: string) => this.addMessage({ user, text }));

    this.connection.on("receiveNotification", (text: string) => this.addMessage({ user: "notification", text }));

    this.connection.on("receiveGroupsList", (groups: string[]) => this.groups = groups);

    this.connection.on("joinedNotification", (group: string) => {
      this.addMessage({ user: "notification", text: `You joined the group ${group}` });
      this.currentGroup = group;
    });

    this.connection.on("leftNotification", (group: string) => this.addMessage({ user: "notification", text: `You left the group ${group}` }));

    this.connection.start().catch(err => this.addMessage({ user: "error", text: err }));
  }

  ngOnInit() {
  }

  send() {
    if (this.currentGroup === undefined)
      throw new Error("Not in a group");
    this.connection.send("sendMessage", this.currentGroup, this.username, this.text)
      .then(() => this.text = null);
  }

  joinGroup(e: Event, group: string) {
    e.preventDefault();
    if (group === this.currentGroup) return;
    this.connection.send("leaveGroup", this.currentGroup);
    this.connection.send("joinGroup", group)
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