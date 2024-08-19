using Notes_project.Models;

namespace Notes_project.services.Authentication
{
    public interface IJwtProvider
    {
        string GenerateToken(User user);
    }
}
