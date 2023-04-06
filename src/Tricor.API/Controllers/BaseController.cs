using Tricor.API.DTOs;
using Tricor.API.Helpers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
 using System.Security.Claims;
#nullable disable

namespace Tricor.API.Controllers
{
    [EnableCors]
    [ApiController]
    public class BaseController : ControllerBase
    {
        public CurrentUser CurrentUser { get { return this.currentUser; } }
        private CurrentUser currentUser = null;
        public readonly IHttpContextAccessor _httpContextAccessor;

        public BaseController()
        {
            _httpContextAccessor = HttpContextHelper._httpContextAccessor;   
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null && identity.Claims != null && identity.Claims.Any())
            {
                currentUser = new CurrentUser();

                currentUser.UserId = Convert.ToInt32(identity.FindFirst("UserId").Value);
                currentUser.UserName = identity.FindFirst("UserName").Value;
                currentUser.Email = identity.FindFirst("Email").Value;
            }
            
        }
    }
}
