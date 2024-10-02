using Notes_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.DataAccess.Repository.IRepository;

namespace ProjectTrackingSpotify.DataAccess.Repository.IRepository
{
    public interface IGroupRepository : IRepository<Group>
    {
        Task CreateGroup(GroupDTO group);
        Task AddUserToGroup(int groupId, User user);
        Task AddNoteToGroup(int groupId, NotesDTO note);
        Task<ICollection<Notes>> GetNotesFromGroup(int groupId);
        Task DeleteNoteFromGroup(int groupId, int noteId);
        Task DeleteUserFromGroup(int groupId, Guid userId);
        Task UpdateNoteFromGroup(int groupId, int noteId);
        Task<object> GetGroupData(int groupId); 
    }
}
