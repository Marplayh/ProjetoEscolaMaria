using Microsoft.EntityFrameworkCore;
using SchoolProject.Models;

namespace SchoolProject.Data
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> opts): base(opts) { 
        }
        public DbSet<Student> Students { get; set; }
        public DbSet<SchoolTeam> SchoolTeams { get; set; }
    }
}
