using Notes_project.Models.ModelsDTO;

namespace Notes_project.services.Authentication
{
    public interface IJwtProvider
    {
        string GenerateToken(UserDTOTest user);
    }
}