using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolProject.Data;
using SchoolProject.Data.Dtos;
using SchoolProject.Models;

namespace SchoolProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolTeamsController : ControllerBase
    {
        private readonly SchoolContext _context;
        private IMapper _mapper;

        public SchoolTeamsController(SchoolContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/SchoolTeams
        [HttpGet]
        public IEnumerable<ReadteamDto> getTeams()
        {
            var teams = _context.SchoolTeams.Include(t => t.Students).ToList();
            return _mapper.Map<List<ReadteamDto>>(teams);
        }

        // GET: api/SchoolTeams/5
        [HttpGet("{id}")]
        public IActionResult GetByIdTeam(int id)
        {
            SchoolTeam team = _context.SchoolTeams.FirstOrDefault(team => team.Id == id);
            if (team != null)
            {
                ReadteamDto teamDto = _mapper.Map<ReadteamDto>(team);
                return Ok(teamDto);
            }
            return NotFound();
        }

        // PUT: api/SchoolTeams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        // POST: api/SchoolTeams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostTeam([FromBody] CreateTeamDto teamDto)
        {
            SchoolTeam team = _mapper.Map<SchoolTeam>(teamDto);
            _context.SchoolTeams.Add(team);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetByIdTeam), new { Id = team.Id }, team);
        }

        // DELETE: api/SchoolTeams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchoolTeam(int id)
        {
            if (_context.SchoolTeams == null)
            {
                return NotFound();
            }
            var schoolTeam = await _context.SchoolTeams.FindAsync(id);
            if (schoolTeam == null)
            {
                return NotFound();
            }

            _context.SchoolTeams.Remove(schoolTeam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SchoolTeamExists(int id)
        {
            return (_context.SchoolTeams?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
