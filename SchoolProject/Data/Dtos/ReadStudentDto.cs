using SchoolProject.Models;
using System.ComponentModel.DataAnnotations;

namespace SchoolProject.Data.Dtos
{
    public class ReadStudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Registration { get; set; }
        public DateTime BirthDate { get; set; }
        public ReadteamDto SchoolTeam { get; set; }
    }
}
