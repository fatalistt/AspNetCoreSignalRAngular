import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ChatHubService } from '../chat-hub.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chat', { static: false }) private main: ElementRef<HTMLElement>;
  text: string;
  groups: string[] = [];
  readonly messages: Message[] = [];
  private readonly username = new Date().getTime().toString();
  private currentGroup: string;
  private readonly receiveMessageHandler = (user: string, text: string): void => this.addMessage({ user, text });
  private readonly receiveNotificationHandler = (text: string): void => this.addMessage({ user: "notification", text });
  private readonly receiveGroupsListHandler = (groups: string[]): string[] => this.groups = groups;
  private readonly joinedNotificationHandler = (group: string): void => {
    this.addMessage({ user: "notification", text: `You joined the group ${group}` });
    this.currentGroup = group;
  };
  private readonly leftNotificationHandler = (group: string): void => this.addMessage({ user: "notification", text: `You left the group ${group}` });

  constructor(private chatHub: ChatHubService) {
  }

  ngOnInit(): void {
    this.chatHub.onReceiveMessage(this.receiveMessageHandler);
    this.chatHub.onReceiveNotification(this.receiveNotificationHandler);
    this.chatHub.onReceiveGroupsList(this.receiveGroupsListHandler);
    this.chatHub.onJoinedNotification(this.joinedNotificationHandler);
    this.chatHub.onLeftNotification(this.leftNotificationHandler);
    this.chatHub.getGroupsList();
  }

  ngOnDestroy(): void {
    this.chatHub.offReceiveMessage(this.receiveMessageHandler);
    this.chatHub.offReceiveNotification(this.receiveNotificationHandler);
    this.chatHub.offReceiveGroupsList(this.receiveGroupsListHandler);
    this.chatHub.offJoinedNotification(this.joinedNotificationHandler);
    this.chatHub.offLeftNotification(this.leftNotificationHandler);
  }

  send(): void {
    if (this.currentGroup === undefined) throw new Error("Not in a group");
    this.chatHub.sendMessage(this.currentGroup, this.username, this.text).then(() => this.text = null);
  }

  joinGroup(e: Event, group: string): void {
    e.preventDefault();
    if (group === this.currentGroup) return;
    this.chatHub.leaveGroup(this.currentGroup);
    this.chatHub.joinGroup(group);
  }

  isCurrentGroup(group: string): boolean {
    return group === this.currentGroup;
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