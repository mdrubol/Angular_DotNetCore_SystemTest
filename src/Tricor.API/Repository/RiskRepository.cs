using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using Tricor.API.Context;
using Tricor.API.Contracts;
using Tricor.API.Entities;
namespace Tricor.API.Repository
{
	public class RiskRepository : IRiskRepository
	{
		private readonly DapperContext _context;

		public RiskRepository(DapperContext context)
		{
			_context = context;
		}
        public async Task<IEnumerable<Risk>> GetRisks(int userId)
        {
            var query = "";               

            if(userId == 0)
            {
                query = "SELECT * FROM Risk";
            }
            else if(userId == -1) {
                query = $"SELECT * FROM Risk WHERE CreatedBy = (SELECT TOP 1 UserId FRom UserRoles WHERE RoleId=1)";

            }
            else
            {
                query = $"SELECT * FROM Risk WHERE CreatedBy = {userId}";
            }

            using (var connection = _context.CreateConnection())
            {
                var risk = await connection.QueryAsync<Risk>(query);

                return risk.ToList(); 
            }
        }
        public async Task<Risk> GetRiskById(int id)
        {
            var query = "SELECT * FROM Risk WHERE Id = @Id";
            using (var connection = _context.CreateConnection())
            {
                //connection.Open();               
                var risk =  await connection.QueryFirstOrDefaultAsync<Risk>(query, new { id });
                return risk;
            }
        }
        public async Task CreateRisk(Risk risk)
        {
            var query = "INSERT INTO Risk (Name, Description, CreatedBy) VALUES (@Name, @Description, @CreatedBy)";
            var parameters = new DynamicParameters();
            parameters.Add("Name", risk.Name, DbType.String);
            parameters.Add("Description ", risk.Description, DbType.String);
            parameters.Add("CreatedBy ", risk.CreatedBy, DbType.Int32);
            
            using (var connection = _context.CreateConnection())
            {
                ///connection.Open();
                 await connection.ExecuteAsync(query, parameters);
            }
        }
        public async Task UpdateRisk(int id, Risk risk)
        {
            string sqlQuery = "UPDATE Risk SET Name = @Name, Description = @Description, CreatedBy = @CreatedBy WHERE Id = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Name", risk.Name, DbType.String);
            parameters.Add("Description ", risk.Description, DbType.String);
            parameters.Add("CreatedBy ", risk.CreatedBy, DbType.Int32);
            parameters.Add("Id", id, DbType.Int32);
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }
        public async Task DeleteRisk(int id)
        {
            var query = "DELETE FROM Risk WHERE Id = @Id";
            using (var connection = _context.CreateConnection())
            {                
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }

        
    }
}
