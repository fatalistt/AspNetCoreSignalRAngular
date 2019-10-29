import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ChatHubService } from '../chat-hub.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chat', { static: false }) private main: ElementRef<HTMLElement>;
  @ViewChild('message', { static: false }) private message: ElementRef<HTMLInputElement>;
  text: string;
  groups: Observable<string[]>;
  readonly messages: Message[] = [];
  private readonly username = new Date().getTime().toString();
  private readonly receiveMessageHandler = (user: string, text: string): void => this.addMessage({ user, text });
  private readonly receiveNotificationHandler = (text: string): void => this.addMessage({ user: "notification", text });
  private readonly joinedNotificationHandler = (group: string): void => this.addMessage({ user: "notification", text: `You joined the group ${group}` });
  private readonly leftNotificationHandler = (group: string): void => this.addMessage({ user: "notification", text: `You left the group ${group}` });

  constructor(private chatHub: ChatHubService) {
  }

  ngOnInit(): void {
    this.groups = this.chatHub.getGroups();
    this.chatHub.onReceiveMessage(this.receiveMessageHandler);
    this.chatHub.onReceiveNotification(this.receiveNotificationHandler);
    this.chatHub.onJoinedNotification(this.joinedNotificationHandler);
    this.chatHub.onLeftNotification(this.leftNotificationHandler);
  }

  ngOnDestroy(): void {
    this.chatHub.offReceiveMessage(this.receiveMessageHandler);
    this.chatHub.offReceiveNotification(this.receiveNotificationHandler);
    this.chatHub.offJoinedNotification(this.joinedNotificationHandler);
    this.chatHub.offLeftNotification(this.leftNotificationHandler);
  }

  send(): void {
    if (this.text.trim() == "") {
      this.text = null;
      return;
    }
    this.chatHub.sendMessage(this.username, this.text).then(() => this.text = null);
  }

  sendIfEnter(event: KeyboardEvent): void {
    if (event.key === "Enter")
      this.send();
  }

  joinGroup(e: Event, group: string): void {
    e.preventDefault();
    if (this.isCurrentGroup(group)) return;
    this.chatHub.leaveCurrentGroup();
    this.chatHub.joinGroup(group);
  }

  isCurrentGroup(group: string): boolean {
    return group === this.chatHub.currentGroup;
  }

  private addMessage(message: Message): void {
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