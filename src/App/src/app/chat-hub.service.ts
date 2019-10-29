import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService {
  private readonly connection: signalR.HubConnection;
  private readonly startPromise: Promise<void>;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/api/chat")
      .build();
    this.startPromise = this.connection.start().catch(err => console.warn(err));
  }

  private on(methodName: string, newMethod: (...args: unknown[]) => void): void {
    this.connection.on(methodName, newMethod);
    console.log("ChatHub", "on", methodName, newMethod);
  }

  private off(methodName: string, method: (...args: unknown[]) => void): void {
    this.connection.off(methodName, method);
    console.log("ChatHub", "off", methodName, method);
  }

  private async send(methodName: string, ...args: unknown[]): Promise<void> {
    await this.startPromise;
    this.connection.send(methodName, ...args);
  }

  sendMessage(group: string, username: string, text: string): Promise<void> {
    return this.send("sendMessage", group, username, text);
  }

  leaveGroup(group: string): Promise<void> {
    return this.send("leaveGroup", group);
  }

  joinGroup(group: string): Promise<void> {
    return this.send("joinGroup", group);
  }

  getGroupsList(): Promise<void> {
    return this.send("getGroupsList");
  }

  onReceiveMessage(newMethod: (...args: unknown[]) => void): void {
    this.on("receiveMessage", newMethod);
  }

  offReceiveMessage(method: (...args: unknown[]) => void): void {
    this.off("receiveMessage", method);
  }

  onReceiveNotification(newMethod: (...args: unknown[]) => void): void {
    this.on("receiveNotification", newMethod);
  }

  offReceiveNotification(method: (...args: unknown[]) => void): void {
    this.off("receiveNotification", method);
  }

  onReceiveGroupsList(newMethod: (...args: unknown[]) => void): void {
    this.on("receiveGroupsList", newMethod);
  }

  offReceiveGroupsList(method: (...args: unknown[]) => void): void {
    this.off("receiveGroupsList", method);
  }

  onJoinedNotification(newMethod: (...args: unknown[]) => void): void {
    this.on("joinedNotification", newMethod);
  }

  offJoinedNotification(method: (...args: unknown[]) => void): void {
    this.off("joinedNotification", method);
  }

  onLeftNotification(newMethod: (...args: unknown[]) => void): void {
    this.on("leftNotification", newMethod);
  }

  offLeftNotification(method: (...args: unknown[]) => void): void {
    this.off("leftNotification", method);
  }
}
