using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Notes_project.Models
{
    public class Notes
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public string PhotoCode { get; set; }
        public int? UsersId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public Group? Group { get; set; }

        [ForeignKey("Group")]
        public int? GroupId { get; set; }
    }
}