using AutoMapper;
using SchoolProject.Data.Dtos;
using SchoolProject.Models;

namespace SchoolProject.Profiles
{
    public class StudentProfile : Profile
    {
        public StudentProfile() {
            CreateMap<CreateStudentDto, Student>();
            CreateMap<Student, ReadStudentDto>().ForMember(dto => dto.SchoolTeam, opt => opt.MapFrom(student => new ReadteamDto
            {
                Id = student.SchoolTeam.Id,
                TeamNumber = student.SchoolTeam.TeamNumber,
                TeamName = student.SchoolTeam.TeamName
            }));
            CreateMap<UpdateStudentDto, Student>();
        }
    }
}
