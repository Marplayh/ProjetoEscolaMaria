using System.ComponentModel.DataAnnotations;

namespace SchoolProject.Models
{
    public class Student
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "Nome obrigatório")]
        [StringLength(200)]
        public string Name { get; set; }
        public string Registration { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime BirthDate { get; set; }

        public int SchoolTeamId { get; set; }
        public virtual SchoolTeam SchoolTeam { get; set; }




        public void createRegistration()
        {
            string letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras disponíveis para a matrícula
            Random random = new Random();

            // Gerar três letras aleatórias
            string registration = "";
            for (int i = 0; i < 3; i++)
            {
                int index = random.Next(letters.Length);
                registration += letters[index];
            }

            // Gerar quatro números aleatórios
            registration += random.Next(1000, 9999).ToString();

            Registration = registration;
        }
    }
}
