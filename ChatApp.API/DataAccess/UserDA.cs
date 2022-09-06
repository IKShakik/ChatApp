using ChatApp.API.Models;
using ChatApp.API.Services;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.API.DataAccess
{
    public class UserDA
    {
        private readonly AppDBContext _dbContext = new AppDBContext(new DbContextOptions<AppDBContext>());
        private List<User> users = new List<User>();

        public UserDA()
        {
        }

        public string SaveUser(User user)
        {
            if (user == null) return null;
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return "Saved successfully.";
        }
        public IEnumerable<User> GetAllUsers()
        {
            users = _dbContext.Users.ToList();
            return users;
        }
    }
}
