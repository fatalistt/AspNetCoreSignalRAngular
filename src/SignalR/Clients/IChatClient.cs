using System.Threading.Tasks;

namespace AspNetCoreSignalRAngular.SignalR.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(string user, string text);
        Task ReceiveNotification(string text);
    }
}