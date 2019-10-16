using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using AspNetCoreSignalRAngular.SignalR.Clients;

namespace AspNetCoreSignalRAngular.SignalR.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private static readonly string[] groups = { "All Users", "Group1", "Group2" };
        public async Task SendMessage(string group, string user, string text)
        {
            if (!groups.Contains(group))
                throw new ArgumentOutOfRangeException(nameof(group), group, null);
            await Clients.Group(group).ReceiveMessage(user, text);
        }

        public async Task JoinGroup(string group)
        {
            if (!groups.Contains(group))
                throw new ArgumentOutOfRangeException(nameof(group), group, null);
            await Groups.AddToGroupAsync(Context.ConnectionId, group);
            await Clients.OthersInGroup(group).ReceiveNotification($"{Context.ConnectionId} has joined the group {group}");
            await Clients.Caller.JoinedNotification(group);
        }

        public async Task LeaveGroup(string group)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, group);
            await Clients.Group(group).ReceiveNotification($"{Context.ConnectionId} has left the group {group}");
            await Clients.Caller.LeftNotification(group);
        }

        public override Task OnConnectedAsync()
        {
            return Task.WhenAll(base.OnConnectedAsync(), Clients.Caller.ReceiveGroupsList(groups), JoinGroup("All Users"));
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}