using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using AspNetCoreSignalRAngular.SignalR.Clients;
using System;

namespace AspNetCoreSignalRAngular.SignalR.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(string user, string text)
        {
            await Clients.All.ReceiveMessage(user, text);
        }

        public async Task NewMessage(string user, string text)
        {
            await SendMessage(user, text);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).ReceiveNotification($"{Context.ConnectionId} has joined the group {groupName}");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).ReceiveNotification($"{Context.ConnectionId} has left the group {groupName}");
        }

        public override Task OnConnectedAsync()
        {
            return Task.WhenAll(base.OnConnectedAsync(), AddToGroup("All Users"));
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return Task.WhenAll(RemoveFromGroup("All Users"), base.OnDisconnectedAsync(exception));
        }
    }
}