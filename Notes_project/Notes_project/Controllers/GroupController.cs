using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes_project.Models;
using ProjectTrackingSpotify.DataAccess.Repository;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;
using System.Text.RegularExpressions;

namespace Notes_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IUserRepository _userRepository;

        public GroupController(IGroupRepository groupRepository, IUserRepository userRepository)
        {
            _groupRepository = groupRepository;
            _userRepository = userRepository;

        }
        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] GroupDTO group)
        {
            await _groupRepository.CreateGroup(group);
            await _groupRepository.Save();
            return Ok();
        }

        [HttpPost("AddUserToGroup")]
        public async Task<IActionResult> AddUserToGroup(int groupId)
        {
            var userIdClaim = User.FindFirst("userId");
            if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }

            // АЛЕ ЮСЕРА ТРЕБА ВИБИРАТИ, А НЕ ВСТАВЛЯТИ АВТОМАТИЧНО КОРИСТУВАЧА

            var user = _userRepository.Get(u => u.Id == userId);

            await _groupRepository.AddUserToGroup(groupId, user);
            await _userRepository.Save();

            return Ok();
        }

        [HttpPost("AddNotesToGroup/{groupId}")]
        public async Task<IActionResult> AddNotesToGroup(int groupId, [FromBody] NotesDTO note)
        {
            try
            {
                await _groupRepository.AddNoteToGroup(groupId, note);
            }
            catch (Exception)
            {

                throw;
            }

            return Ok();
        }
        [HttpGet("GetNotesFromGroup/{groupId}")]
        public async Task<IActionResult> GetNotesFromGroup(int groupId)
        {
            var notes = await _groupRepository.GetNotesFromGroup(groupId);
            return Ok(notes);
        }

        [HttpDelete("DeleteNoteFromGroup/{groupId}/{noteId}")]
        public async Task<IActionResult> DeleteNoteFromGroup(int groupId,int noteId) 
        {
            await _groupRepository.DeleteNoteFromGroup(groupId, noteId);
            return Ok();
        }
        [HttpPut("UpdateNoteFromGroup/{groupId}/{noteId}")]
        public async Task<IActionResult> UpdateNoteFromGroup(int groupId, int noteId) 
        {
            await _groupRepository.UpdateNoteFromGroup(groupId, noteId);
            return Ok();
        }

        [HttpGet("GetAllGroup")]
        public async Task<IActionResult> GetAllGroup() 
        {
            var allGroup = _groupRepository.GetAll();
            return Ok(allGroup);
        }
    }
}
