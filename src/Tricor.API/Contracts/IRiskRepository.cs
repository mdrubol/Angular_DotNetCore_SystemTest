using Tricor.API.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tricor.API.Contracts
{
    public interface IRiskRepository
    {
        public Task<IEnumerable<Risk>> GetRisks(int userId);
        public Task<Risk> GetRiskById(int id);
        public Task CreateRisk(Risk risk);
        public Task UpdateRisk(int id, Risk risk);
        public Task DeleteRisk(int id);
    }
}
