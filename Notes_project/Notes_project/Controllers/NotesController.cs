using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes_project.Models;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;

namespace Notes_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesRepository _notesRepository;

        public NotesController(INotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        [HttpGet("ReciveNote")]
        public IActionResult ReciveNote([FromQuery] int Id) 
        {
            var note = _notesRepository.Get(u => u.Id == Id);
            return Ok(note);
        }

        [HttpGet("GetAllNotes")]
        public IActionResult GetAllNotes() 
        {
            var allNotes = _notesRepository.GetAll();
            return Ok(allNotes);
        }

        [HttpPost("Create")]

        public async Task<IActionResult> Create([FromBody] Notes note) 
        {
           await _notesRepository.Add(note);
           await _notesRepository.Save();

            return Ok("Ви успішно створили замітку");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int Id) 
        {
            Notes note =  _notesRepository.Get(u => u.Id == Id);

            _notesRepository.Remove(note);
            _notesRepository.Save();


            return Ok("Видалення пройло успішно");
        }

        [HttpPut]
        public IActionResult UpdateNote([FromBody] int Id) 
        {
            Notes note = _notesRepository.Get(u => u.Id == Id);
            note.IsCompleted = note.IsCompleted ? false : true;  



            _notesRepository.Update(note);
            _notesRepository.Save();

            return Ok();
        }
    }
}
