using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace AspNetCoreSignalRAngular.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string text)
        {
            await Clients.All.SendAsync("messageReceived", user, text);
        }

        public async Task NewMessage(string user, string text)
        {
            await SendMessage(user, text);
        }
    }
}