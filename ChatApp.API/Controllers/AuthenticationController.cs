using ChatApp.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ChatApp.API.Services;
using NuGet.Protocol.Plugins;

namespace ChatApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly AppDBContext _context;
        private readonly IBasicDataService _basicDataService;

        public AuthenticationController(IConfiguration configuration, AppDBContext context,
            IBasicDataService basicDataService)
        {
            _configuration = configuration;
            _context = context;
            _basicDataService = basicDataService;
        }


        [HttpPost("Lgin")]
        public IActionResult Lgin(User user2)
        {
            if (user2 is null)
            {
                return BadRequest("Invalid user request!!!");
            }

            var user = _basicDataService.GetUserByEmail(user2.Email);

            if (user != null)
            {
                //create claims details based on the user information
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId", user.UserID.ToString()),
                    new Claim("DisplayName", user.FirstName),
                    new Claim("UserName", user.FirstName),
                    new Claim("Email", user.Email)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new JWTTokenResponse
                {
                    Token = tokenString
                });
            }

            // var secretKey =
            //         new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
            //     var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            //     var tokeOptions = new JwtSecurityToken(issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
            //         audience: ConfigurationManager.AppSetting["JWT:ValidAudience"], claims: new List<Claim>(),
            //         expires: DateTime.Now.AddMinutes(6), signingCredentials: signinCredentials);
            //     var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            //     return Ok(new JWTTokenResponse
            //     {
            //         Token = tokenString
            //     });

            return Unauthorized();
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(User userData)
        {
            if (userData != null && userData.Email != null)
            {
                var user = _basicDataService.GetUserByEmail(userData.Email);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.UserID.ToString()),
                        new Claim("DisplayName", user.FirstName),
                        new Claim("UserName", user.FirstName),
                        new Claim("Email", user.Email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}