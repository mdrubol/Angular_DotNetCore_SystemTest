using System.Collections.Generic;

namespace Tricor.API.Entities
{

    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }       
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
