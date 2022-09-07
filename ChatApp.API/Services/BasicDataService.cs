using System.Diagnostics.Metrics;
using ChatApp.API.DataAccess;
using ChatApp.API.Models;

namespace ChatApp.API.Services
{
    public class BasicDataService : IBasicDataService
    {
        public string SaveUser(User user)
        {
            try
            {
                var userDa = new UserDA();
                return userDa.SaveUser(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public IEnumerable<User> GetAllUsers()
        {
            try
            {
                var userDa = new UserDA();
                return userDa.GetAllUsers();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public User GetUserByEmail(string email)
        {
            try
            {
                var userDa = new UserDA();
                return userDa.GetUserByEmail(email);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
