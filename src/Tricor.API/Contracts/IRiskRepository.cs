using Tricor.API.Entities;
 

namespace Tricor.API.Contracts
{
    public interface IRiskRepository
    {
        public Task<IEnumerable<Risk>> GetRisks(int userId, int? numberOfRows);
        public Task<Risk> GetRiskById(int id);
        public Task CreateRisk(Risk risk);
        public Task UpdateRisk(int id, Risk risk);
        public Task DeleteRisk(int id);
    }
}
