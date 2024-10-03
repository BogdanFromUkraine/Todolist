﻿namespace Notes_project.Models
{
    public class UserDTOTest
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string? UserPhoto { get; set; } = string.Empty;

        public ICollection<string> Roles { get; set; } = [];
        
    }
}
