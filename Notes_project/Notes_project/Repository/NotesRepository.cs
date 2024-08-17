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
    public class NotesRepository : Repository<Notes>, INotesRepository
    {
        private ApplicationDbContext _db;
        public NotesRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

    }
}
