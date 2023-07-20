using SchoolProject.Models;
using System.ComponentModel.DataAnnotations;

namespace SchoolProject.Data.Dtos
{
    public class CreateStudentDto
    {
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public int SchoolTeamId { get; set; }

    }
}
