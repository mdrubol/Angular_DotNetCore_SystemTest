using Dapper;
using Tricor.API.Context;
using Tricor.API.Contracts;
using Tricor.API.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Tricor.API.Repository
{
	public class UserRepository : IUserRepository
	{
		private readonly DapperContext _context;

		public UserRepository(DapperContext context)
		{
			_context = context;
		}

        public async Task<User> AuthenticateUser(string userName, string password)
        {
            string passwordHash = this.ComputeSha256Hash(password);

            var query = "SELECT * FROM Users  WHERE Email = @Email and Password = @Password";

            using (var connection = _context.CreateConnection())
            {
                var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { Email=userName,Password = passwordHash });

                return user;
            }

        }

        public async Task<List<Role>> GetRolesByUserIdAsync(int userId)
        {

            string sql = "SELECT r.* FROM Roles r " +
                         "INNER JOIN UserRoles  ur ON r.id = ur.RoleId  " +
                         "WHERE ur.UserId  = @UserId";

            using (var connection = _context.CreateConnection())
            {
                var roles = await connection.QueryAsync<Role>(sql, new { UserId = userId });
                return roles.Distinct().ToList();
            }
            
        }

        public async Task<User> GetUserById(int id)
        {
            var query = "SELECT * FROM Users  WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { id });

                return user;
            }
        }
        private string ComputeSha256Hash(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
