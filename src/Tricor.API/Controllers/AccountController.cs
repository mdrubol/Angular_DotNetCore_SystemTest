using Tricor.API.Contracts;
using Tricor.API.DTOs;
using Tricor.API.Helpers;
using Tricor.API.WebApi;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
 

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

#nullable disable

namespace Tricor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     
     
    public class AccountController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public AccountController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Authenticate")]
        public async Task<IActionResult> Authenticate(UserLogin userLogin)
        {
            var candidate = await _userRepository.AuthenticateUser(userLogin.UserName,userLogin.Password);

            if (candidate != null)
            {
                var loginUser = await _userRepository.GetUserById(candidate.Id);
                var userRoles = await _userRepository.GetRolesByUserIdAsync(loginUser.Id);

                var claims = new List<Claim>();
                claims.Add(new Claim("UserName", loginUser.Email));
                claims.Add(new Claim("Email", loginUser.Email));
                claims.Add(new Claim("UserId", loginUser.Id.ToString()));

                // Add roles as multiple claims
                foreach (var role in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));
                }


                var jwtSettings = _configuration.GetSection("JWTSettings")
                                         .Get<JWTSettings>();

                var token = JwtHelper.GetJwtToken(
                                loginUser.Email,
                                jwtSettings.Secret,
                                jwtSettings.Issuer,
                                jwtSettings.Audience,
                                TimeSpan.FromMinutes(jwtSettings.TokenTimeoutMinutes),
                                claims.ToArray());

                var response = new TokenResponse()
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    ExpiresOnUtc = token.ValidTo,
                    User = new CurrentUser {
                        UserId = loginUser.Id,
                        Email = loginUser.Email, 
                        UserName=loginUser.FirstName +" "+loginUser.LastName,
                        Roles= userRoles.Select(r=> r.Name).ToList()
                    }
                };

                //base.CurrentUser= response.User;

                return Ok(response);
            }
            else
            {
                return Unauthorized("Invalid Login Credentials!");
            }
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("TestAuthorization")]
        public async Task<IActionResult> TestAuthorization()
        {
            string msg = "Take rest everything is well.";

            return Ok( await Task.FromResult(msg));
        }
    }
}
