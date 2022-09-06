using System.Diagnostics.Metrics;
using System.ServiceModel;
using ChatApp.API.Models;

namespace ChatApp.API.Services
{
    public interface IBasicDataService
    {
        [OperationContract]
        IEnumerable<User> GetAllUsers();

        [OperationContract]
        string SaveUser(User user);
    }
}
