namespace Notes_project.Models
{
    public class User
    {
        public User()
        {
            
        }
        // я створив простий model, просто добавив метод по створення юсера, це зручно
        private User(Guid id, string userName, string passwordHash, string email) 
        {
            Id = id;
            UserName = userName;
            PasswordHash = passwordHash;
            Email = email;
        }

        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string? UserPhoto { get; set; } = string.Empty;

        public ICollection<Role> Roles { get; set; } = [];
        public ICollection<Notes> Notes { get; set; } = [];

        public ICollection<Group> Groups { get; set; } = [];

        public static User Create(Guid id, string userName, string passwordHash, string email) 
        {
            return new User(id, userName, passwordHash, email);
        }
    }
}
