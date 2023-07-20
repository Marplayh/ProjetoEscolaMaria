using SchoolProject.Models;

namespace SchoolProject.Data.Dtos
{
    public class ReadteamDto
    {
        public int Id { get; set; }
        public int TeamNumber { get; set; }
        public string TeamName { get; set; }
        public virtual ICollection<ReadStudentDto> Students { get; set; }

    }
}
