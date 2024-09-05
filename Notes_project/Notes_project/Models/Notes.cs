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

        public int UsersId { get; set; }
        [JsonIgnore] 
        //уникає циклічні посилання(Використовується тоді коли є взаємні посилання між об'єктами)
        //ця властивість не буде включатися у відповідь JSON
        //тобто коли буде повертатися Note, дані User не будуть приєднані до відповідіІ
        public User User { get; set; }
    }
}
    