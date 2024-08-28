using Microsoft.AspNetCore.Authorization;
using Notes_project.Models;
using System.Data.SqlTypes;

namespace Notes_project.Services
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement(Enum.Permission[] permissions)
        {
            Permissions = permissions;
        }
        public Enum.Permission[] Permissions { get; set; } = [];
    }
}
