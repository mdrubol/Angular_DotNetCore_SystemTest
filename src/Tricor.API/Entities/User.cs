﻿
using System;
using System.Collections.Generic;

namespace Tricor.API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime LastLogIn  { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }

    }
