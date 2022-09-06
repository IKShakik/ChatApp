using System.Net;
using ChatApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using ChatApp.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace ChatApp.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IBasicDataService _basicDataService;
        IEnumerable<User> users = new List<User>();


        public UserController(IBasicDataService basicDataService)
        {
            _basicDataService = basicDataService;
        }

        // [HttpGet]
        // [AllowAnonymous]
        // //[Route("GetUsers")]
        // public IEnumerable<User> GetUsers()
        // {
        //     return new User[] { new User(){UserID = 1, FirstName = "I.K.", LastName = "Shakik"} };
        // }
        //
        // [HttpGet]
        // [AllowAnonymous]
        // //[Route("weatherforecast")]
        // public IEnumerable<WeatherForecast> weatherforecast()
        // {
        //     var summaries = new[]
        //     {
        //         "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        //     };
        //     var forecast = Enumerable.Range(1, 5).Select(index =>
        //      new WeatherForecast
        //      (
        //          DateTime.Now.AddDays(index),
        //          Random.Shared.Next(-20, 55),
        //          summaries[Random.Shared.Next(summaries.Length)]
        //      ))
        //     .ToArray();
        //     return forecast;
        // }

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            //var user = new User() { UserID = 1, FirstName = "IK", LastName = "Shakik" };
            //users.Add(user);
            users = _basicDataService.GetAllUsers();
            return users;
        }

        [HttpPost]
        public string SaveUser(User user)
        {
            var response = _basicDataService.SaveUser(user);
            return response.ToString();
        }
    }
}
