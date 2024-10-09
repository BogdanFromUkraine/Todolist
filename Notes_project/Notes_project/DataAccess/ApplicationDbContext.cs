using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Notes_project.Configuration;
using Notes_project.Models;

namespace Notes_project.DataAccess
{
    //використовую AuthorizationOptions, всі такі конфігурації зберігаються в IOptions
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options,
        IOptions<AuthorizationOptions> authOptions) : DbContext(options)
    {
        public DbSet<Notes> Notes { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Models.Permission> Permissions { get; set; }
        public DbSet<Models.Role> Roles { get; set; }
        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Group> Group { get; set; }

        protected override async void OnModelCreating(ModelBuilder modelBuilder)
        {
            //цей код автоматично застосовує всі конфігурації
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

            modelBuilder.ApplyConfiguration(new RolePermissionConfiguration(authOptions.Value));
        }
    }
}