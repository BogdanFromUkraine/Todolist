using Microsoft.AspNetCore.Authorization;

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