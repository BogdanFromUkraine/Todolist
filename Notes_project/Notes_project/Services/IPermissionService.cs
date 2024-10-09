namespace Notes_project.Services
{
    public interface IPermissionService
    {
        public Task<HashSet<Notes_project.Enum.Permission>> GetPermissionsAsync(Guid userId);
    }
}