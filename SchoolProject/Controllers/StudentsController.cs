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
    public class StudentsController : ControllerBase
    {
        private readonly SchoolContext _context;
        private IMapper _mapper;

        public StudentsController(SchoolContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public IEnumerable<ReadStudentDto> getStudents([FromQuery] int skip = 0, [FromQuery] int take = 20)
        {
            return _mapper.Map<List<ReadStudentDto>>(_context.Students.Skip(skip).Take(take).ToList());
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public IActionResult getStudentById(int id)
        {
            var student = _context.Students.FirstOrDefault(student => student.Id == id);
            if (student == null) return NotFound();
            var studentDto = _mapper.Map<ReadStudentDto>(student);
            return Ok(studentDto);

        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult postStudent([FromBody] CreateStudentDto studentDto)
        {
            Student student = _mapper.Map<Student>(studentDto);
            student.createRegistration();
            _context.Students.Add(student);
            _context.SaveChanges();
            return CreatedAtAction(nameof(getStudentById), new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, [FromBody] UpdateStudentDto studentDto)
        {
            Student student = _context.Students.FirstOrDefault(student => student.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            _mapper.Map(studentDto, student);
            _context.SaveChanges();
            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return (_context.Students?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
