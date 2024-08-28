using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes_project.Models;
using Notes_project.services.Authentication;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;

namespace Notes_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesRepository _notesRepository;
        private readonly IUserService _userService;
        public NotesController(INotesRepository notesRepository, IUserService userService)
        {
            _notesRepository = notesRepository;
            _userService = userService;
        }

        [HttpGet("ReciveNote")]
        [Authorize]
        public IActionResult ReciveNote([FromQuery] int Id) 
        {
            var note = _notesRepository.Get(u => u.Id == Id);
            return Ok(note);
        }

        [HttpGet("GetAllNotes")]
        [Authorize]
        public IActionResult GetAllNotes() 
        {
            var allNotes = _notesRepository.GetAll();
            return Ok(allNotes);
        }

        [HttpPost("Create")]
        
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Notes note) 
        {
           await _notesRepository.Add(note);
           await _notesRepository.Save();

            return Ok("Ви успішно створили замітку");
        }
        
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete([FromQuery] int Id) 
        {
            Notes note =  _notesRepository.Get(u => u.Id == Id);

            _notesRepository.Remove(note);
            _notesRepository.Save();


            return Ok("Видалення пройло успішно");
        }

        [HttpPut]
        [Authorize]
        public IActionResult UpdateNote([FromBody] int Id) 
        {
            Notes note = _notesRepository.Get(u => u.Id == Id);
            note.IsCompleted = note.IsCompleted ? false : true;  



            _notesRepository.Update(note);
            _notesRepository.Save();

            return Ok();
        }

        [HttpPost("Login")]
        public IActionResult Login(string userName, string email, string password)
        {
            var JwtToken = _userService.Login(email, password);
            return Ok(JwtToken);
        }

        [HttpPost("Register")]
        public IActionResult Register(string userName, string email, string password)
        {
            var JwtToken = _userService.Register(userName, email, password);
            return Ok(JwtToken);
        }
    }
}
