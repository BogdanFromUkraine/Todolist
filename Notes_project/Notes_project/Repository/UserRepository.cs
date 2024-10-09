using Microsoft.EntityFrameworkCore;
using Notes_project.DataAccess;
using Notes_project.Models;
using Notes_project.Models.ModelsDTO;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;
using System.Data;
using WebApp.DataAccess.Repository;

namespace ProjectTrackingSpotify.DataAccess.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<HashSet<Notes_project.Enum.Permission>> GetUserPermission(Guid userId)
        {
            try
            {
                var roles = _db.User
              .AsNoTracking()
              .Include(u => u.Roles)
              .ThenInclude(r => r.Permissions)
              .Where(u => u.Id == userId)
              .Select(u => u.Roles)
              .ToListAsync().GetAwaiter().GetResult();

                return roles
                    .SelectMany(r => r)
                    .SelectMany(r => r.Permissions)
                    .Select(p => (Notes_project.Enum.Permission)p.Id)
                    .ToHashSet();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ICollection<Notes>> GetAllUserNotes(Guid userId)
        {
            var notes = await _db.User
                .Where(u => userId == u.Id)
                .Include(u => u.Notes)
                .SelectMany(u => u.Notes)
                .ToListAsync();

            return notes;
        }

        public async Task<Notes> GetUserNotes(Guid userId, int noteId)
        {
            var user = await _db.User
                .Include(u => u.Notes)
                .FirstOrDefaultAsync(n => n.Id == userId);
            var note = user.Notes.FirstOrDefault(n => n.Id == noteId);

            return note;
        }

        public async Task RemoveUserNote(Guid userId, int noteId)
        {
            var user = await _db.User
               .Include(u => u.Notes)
               .FirstOrDefaultAsync(n => n.Id == userId);
            var note = user.Notes.FirstOrDefault(n => n.Id == noteId);

            user.Notes.Remove(note);
        }

        public async Task UpdateUserNote(Guid userId, int noteId)
        {
            try
            {
                var user = await _db.User
             .Include(u => u.Notes)
             .FirstOrDefaultAsync(n => n.Id == userId);
                var note = user.Notes.FirstOrDefault(n => n.Id == noteId);
                note.IsCompleted = note.IsCompleted ? false : true;

                _db.Update(note);
                _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task AddTest(User user)
        {
            try
            {
                var roleEntity = _db.Roles.SingleOrDefaultAsync(r => r.Id == (int)Notes_project.Enum.Role.User).GetAwaiter().GetResult();
                var userEntity = new User()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    PasswordHash = user.PasswordHash,
                    Email = user.Email,
                    Roles = [roleEntity]
                };

                _db.User.Add(userEntity);
                _db.SaveChangesAsync().GetAwaiter().GetResult();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<UserDTOTest> GetUser(string email)
        {
            try
            {
                var user = _db.User
                .Include(u => u.Roles)
                .Include(u => u.Groups)
                .FirstOrDefault(u => u.Email == email);

                var userDto = new UserDTOTest
                {
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                    PasswordHash = user.PasswordHash,
                    UserPhoto = user.UserPhoto,
                    Roles = user.Roles.Select(r => r.Name).ToList(), // Додаємо тільки назви ролей
                    Groups = user.Groups.Select(r => r.GroupId).ToList()
                };

                return userDto;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}