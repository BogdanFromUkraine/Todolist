
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Notes_project.DataAccess;
using Notes_project.Enum;
using Notes_project.Extensions;
using Notes_project.Models;
using Notes_project.services;
using Notes_project.services.Authentication;
using Notes_project.Services;
using ProjectTrackingSpotify.DataAccess.Repository;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;
using System;
using System.Security.Cryptography;
using System.Text;

namespace Notes_project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            //добавляю CORS

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

            //створив Configuration, щоб получити secret key
            var configuration = builder.Configuration;

            //створюю конфігурацію, щоб пізніше переадти через DI
            builder.Services.Configure<AuthorizationOptions>(configuration.GetSection(nameof(AuthorizationOptions)));
            



            
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options => 
                {
                    options.TokenValidationParameters = new() 
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes("djvoijwefijivdcwfipsdfjjsin3nofsdjakfljadjiojsewrdftgyhujigytfrderdftgyhujikojihuygtfrdeftgyhujk32lkmjnhugfdrefghjkjhgytfrd"))
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies["2"];
                          //  context.Token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            // Логування помилки
                            
                            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                            return Task.CompletedTask;
                        }
                    };
                });

            builder.Services.AddAuthorization();

            builder.Services.AddScoped<INotesRepository, NotesRepository>();
            builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IJwtProvider, JwtProvider>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IPermissionService, PermissionService>();
            builder.Services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
            builder.Services.AddScoped<IGroupRepository, GroupRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddHttpContextAccessor();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.MapControllers();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors("reactProject");

            app.MapPost("get", () =>
            {
                return Results.Ok("fjdlk");
            }).RequireAuthorization().RequirePermissions(Enum.Permission.Read);

            app.Run();
        }
    }
}
