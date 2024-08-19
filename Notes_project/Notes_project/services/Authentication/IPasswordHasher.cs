namespace Notes_project.services.Authentication
{
    public interface IPasswordHasher
    {
        string Generate(string password);

        bool Verify(string password, string hashedPassword);
    }
}
