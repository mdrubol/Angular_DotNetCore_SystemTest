using Tricor.API.Entities;
 

namespace Tricor.API.Contracts
{
    public interface IUserRepository
    {
        Task<User> GetUserById(int id);
        Task<User> AuthenticateUser(string userName, string password);
        Task<List<Role>> GetRolesByUserIdAsync(int userId);
    }
}
