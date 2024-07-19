using Microsoft.EntityFrameworkCore;
using Notes_project.Models;

namespace Notes_project.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Notes> Notes { get; set; }
    }
}
