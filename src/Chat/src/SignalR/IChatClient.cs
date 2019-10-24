using System.Collections.Generic;
using System.Threading.Tasks;

namespace fatalisttechs.Chat.SignalR
{
    public interface IChatClient
    {
        Task ReceiveMessage(string user, string text);
        Task ReceiveNotification(string text);
        Task ReceiveGroupsList(IEnumerable<string> groups);
        Task JoinedNotification(string group);
        Task LeftNotification(string group);
    }
}