using Tricor.API.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tricor.API.Contracts
{
    public interface IUserRepository
    {
        Task<User> GetUserById(int id);
        Task<User> AuthenticateUser(string userName, string password);
        Task<List<Role>> GetRolesByUserIdAsync(int userId);
    }
}
