using System.ComponentModel.DataAnnotations;

namespace SchoolProject.Models
{
    public class SchoolTeam
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int TeamNumber { get; set; }
        public string TeamName { get; set; }
        public virtual ICollection<Student> Students { get; set; }

    }
}
