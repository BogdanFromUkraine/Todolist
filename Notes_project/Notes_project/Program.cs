
using Microsoft.EntityFrameworkCore;
using Notes_project.DataAccess;
using ProjectTrackingSpotify.DataAccess.Repository;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;

namespace Notes_project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            //добавл€ю CORS

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("reactProject",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173");
                        policy.AllowAnyHeader();
                        policy.AllowAnyMethod();
                        policy.AllowCredentials();

                    });
            });

            builder.Services.AddDbContext<ApplicationDbContext>(option =>
             option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<INotesRepository, NotesRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.UseCors("reactProject");

            app.Run();
        }
    }
}
