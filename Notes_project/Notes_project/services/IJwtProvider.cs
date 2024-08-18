using Notes_project.Models;

namespace Notes_project.services
{
    public interface IJwtProvider
    {
        string GenerateToken(User user);
    }
}
