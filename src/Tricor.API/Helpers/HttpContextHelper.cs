#nullable disable
using Microsoft.AspNetCore.Http;

namespace Tricor.API.Helpers
{
    public static class HttpContextHelper
    {
        public static readonly IHttpContextAccessor _httpContextAccessor;

        static HttpContextHelper()
        {
            _httpContextAccessor = new HttpContextAccessor();
        }

        public static HttpContext HttpContext => _httpContextAccessor.HttpContext;
    }
}
