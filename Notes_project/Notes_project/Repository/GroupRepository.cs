using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_project.DataAccess;
using Notes_project.Models;

using ProjectTrackingSpotify.DataAccess.Repository.IRepository;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.DataAccess.Repository;

namespace ProjectTrackingSpotify.DataAccess.Repository
{
    public class GroupRepository : Repository<Group>, IGroupRepository
    {
        private ApplicationDbContext _db;
        internal DbSet<Group> dbSet;
        public GroupRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
            this.dbSet = _db.Set<Group>();
        }

        public async Task CreateGroup(GroupDTO group)
        {
            var groupCreated = new Group()
            {
                Name = group.Name,
                Description = group.Description,
            };
            _db.Group.Add(groupCreated);


        }
        public async Task AddUserToGroup(int groupId, User user)
        {
            try
            {
                var group = await _db.Group
                    .FirstOrDefaultAsync(g => g.GroupId == groupId);
                group.Users.Add(user);
            }
            catch (Exception)
            {

                throw;
            }



        }
        public async Task AddNoteToGroup(int groupId, NotesDTO noteDTO)
        {
            try
            {
                var group = await _db.Group.FirstOrDefaultAsync(g => g.GroupId == groupId);

                var note = new Notes()
                {
                    Title = noteDTO.Title,
                    Description = noteDTO.Description,
                    PhotoCode = noteDTO.PhotoCode,
                    IsCompleted = noteDTO.IsCompleted,


                };

                group.Notes.Add(note);
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }

        }
        public async Task<ICollection<Notes>> GetNotesFromGroup(int groupId)
        {
            try
            {
                var group = await _db.Group
                .Include(g => g.Notes)
                .FirstOrDefaultAsync(g => g.GroupId == groupId);
                var notes = group.Notes;

                return notes;
            }
            catch (Exception)
            {

                throw;
            }

        }
        public async Task DeleteNoteFromGroup(int groupId, [FromBody] int noteId)
        {
            try
            {
                var group = await _db.Group.Include(g => g.Notes).FirstOrDefaultAsync(g => g.GroupId == groupId);

                var deletedNote = group.Notes.FirstOrDefault(i => i.Id == noteId);

                group.Notes.Remove(deletedNote);
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }

        }
        public async Task UpdateNoteFromGroup(int groupId, int noteId) 
        {
            try
            {
                var group = await _db.Group.Include(g => g.Notes).FirstOrDefaultAsync(g => g.GroupId == groupId);

                var note = group.Notes.FirstOrDefault(i => i.Id == noteId);
                note.IsCompleted = note.IsCompleted ? false : true;

                _db.Update(note);
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {

                throw;
            }
           
        }
    }   
}
