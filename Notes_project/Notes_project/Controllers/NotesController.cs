using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Notes_project.Models;
using Notes_project.Models.ModelsDTO;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;

namespace Notes_project.Controllers
{
    [Route("api/Notes")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesRepository _notesRepository;
        private readonly IUserRepository _userRepository;

        public NotesController(INotesRepository notesRepository,
            IUserRepository userRepository)
        {
            _notesRepository = notesRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        [Authorize]
        public IActionResult ReciveNote([FromQuery] int Id)
        {
            var userIdClaim = User.FindFirst("userId");
            if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }
            var note = _userRepository.GetUserNotes(userId, Id).GetAwaiter().GetResult();

            return Ok(note);
        }

        [HttpGet("GetAllNotes")]
        [Authorize]
        public IActionResult GetAllNotes()
        {
            var userIdClaim = User.FindFirst("userId");
            if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }
            var notes = _userRepository.GetAllUserNotes(userId).GetAwaiter().GetResult();

            return Ok(notes);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] NotesDTO note)
        {
            try
            {
                var userIdClaim = User.FindFirst("userId");
                if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }
                var user = _userRepository.Get(u => u.Id == userId);
                var notes = new Notes()
                {
                    Id = note.Id,
                    Title = note.Title,
                    Description = note.Description,
                    IsCompleted = note.IsCompleted,
                    PhotoCode = note.PhotoCode,
                };
                user.Notes.Add(notes);
                await _userRepository.Save();

                return Ok("Ви успішно створили замітку");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int Id)
        {
            var userIdClaim = User.FindFirst("userId");
            if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }

            _userRepository.RemoveUserNote(userId, Id).GetAwaiter().GetResult();
            _userRepository.Save();

            return Ok("Видалення пройло успішно");
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateNote([FromBody]int Id)
        {
            var userIdClaim = User.FindFirst("userId");
            if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }

            await _userRepository.UpdateUserNote(userId, Id);

            return Ok();
        }
    }
}