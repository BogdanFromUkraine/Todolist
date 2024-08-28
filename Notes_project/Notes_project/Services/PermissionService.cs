using Notes_project.Models;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;


namespace Notes_project.Services
{
    public class PermissionService : IPermissionService
    {
        private readonly IUserRepository _userRepository;
        public PermissionService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public Task<HashSet<Notes_project.Enum.Permission>> GetPermissionsAsync(Guid userId)
        {
            return _userRepository.GetUserPermission(userId);
        }
    }
}
