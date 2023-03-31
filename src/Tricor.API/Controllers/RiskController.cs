using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Tricor.API.Contracts;
using Tricor.API.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tricor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RiskController : BaseController
    {
        private readonly IRiskRepository _riskRepository;
        public RiskController(IRiskRepository riskRepository)
        {
            _riskRepository = riskRepository;          
        }

       
        [HttpGet]
        [Authorize]
        [Route("GetRisks/{id}")]
        public async Task<IActionResult> GetRisks(int id)
        {
            try
            {
                 
                var risks = await _riskRepository.GetRisks(id);
                return Ok(risks);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
        // GET api/<RiskController>/5
      
        [HttpGet]
        [Authorize]
        [Route("GetRiskById/{id}")]
        public async Task<Risk> GetRiskById(int id)
        {
            var risk = await _riskRepository.GetRiskById(id);
            return risk;
        }

        // POST api/<RiskController>
       
        [HttpPost]
        [Authorize]
        [Route("CreateRisk")]
        public async Task<Risk> CreateRisk(Risk risk)
        {
            risk.CreatedBy = base.CurrentUser.UserId;
            await _riskRepository.CreateRisk(risk);
           return risk;
        }

        // PUT api/<RiskController>/5

        [HttpPut]
        [Authorize]
        [Route("UpdateRisk")]
        public async Task<Risk> UpdateRisk(Risk risk)
        {
            await _riskRepository.UpdateRisk(risk.Id,risk);
            return risk;
        }

        // DELETE api/<RiskController>/5

        [HttpDelete]
        [Authorize]
        [Route("DeleteRisk/{id}")]
        public async Task<IActionResult> DeleteRisk(int id)
        {
            await _riskRepository.DeleteRisk(id);

            return Ok("Success");    
        }
    }
}
