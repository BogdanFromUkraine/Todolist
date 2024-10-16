﻿using Notes_project.Models;
using Notes_project.Models.ModelsDTO;
using WebApp.DataAccess.Repository.IRepository;

namespace ProjectTrackingSpotify.DataAccess.Repository.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<HashSet<Notes_project.Enum.Permission>> GetUserPermission(Guid userId);

        public Task<ICollection<Notes>> GetAllUserNotes(Guid userId);

        public Task<Notes> GetUserNotes(Guid userId, int noteId);

        public Task RemoveUserNote(Guid userId, int noteId);

        public Task UpdateUserNote(Guid userId, int noteId);

        public Task AddTest(User user);

        public Task<UserDTOTest> GetUser(string email);
    }
}