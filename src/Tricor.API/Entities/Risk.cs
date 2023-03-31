using System.Collections.Generic;

namespace Tricor.API.Entities
{

    public class Risk
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CreatedBy { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();    
    }
}
