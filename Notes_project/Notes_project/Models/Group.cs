namespace Notes_project.Models
{
    public class Group
    {
        public int GroupId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<User>? Users { get; set; } = [];

        public ICollection<Notes>? Notes { get; set; } = [];
    }
}