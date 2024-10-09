using Notes_project.Services;

namespace Notes_project.Extensions
{
    public static class Extensions
    {
        public static IEndpointConventionBuilder RequirePermissions<TBuilder>(
            this TBuilder builder, params Enum.Permission[] permissions)
            where TBuilder : IEndpointConventionBuilder
        {
            return builder.RequireAuthorization(policy =>
            {
                policy.AddRequirements(new PermissionRequirement(permissions));
            });
        }
    }
}