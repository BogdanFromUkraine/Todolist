using Microsoft.AspNetCore.Mvc;
using Notes_project.Models.ModelsDTO;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;

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

        [HttpPost("AddUserToGroup/{groupId}/{userId}")]
        public async Task<IActionResult> AddUserToGroup(int groupId, string userId)
        {
            var userIdGuid = Guid.Parse(userId);
            var user = _userRepository.Get(u => u.Id == userIdGuid);

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
        public async Task<IActionResult> DeleteNoteFromGroup(int groupId, int noteId)
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

        [HttpGet("GetGroupData/{groupId}")]
        public async Task<IActionResult> GetGroupData(int groupId)
        {
            var groupData = await _groupRepository.GetGroupData(groupId);

            return Ok(groupData);
        }

        [HttpDelete("DeleteUserFromGroup/{groupId}/{userId}")]
        public async Task<IActionResult> DeleteUserFromGroup(int groupId, string userId)
        {
            var userIdGuid = Guid.Parse(userId);

            await _groupRepository.DeleteUserFromGroup(groupId, userIdGuid);

            return Ok();
        }
    }
}