using AutoMapper;
using SchoolProject.Data.Dtos;
using SchoolProject.Models;

namespace SchoolProject.Profiles
{
    public class SchoolTeamProfile : Profile
    {

        public SchoolTeamProfile() {
            CreateMap<CreateTeamDto, SchoolTeam>();
            CreateMap<SchoolTeam, ReadteamDto>();
            CreateMap<SchoolTeam, ReadStudentDto>();
        }
    }
}
