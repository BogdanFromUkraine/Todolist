﻿using Notes_project.Models;
using Notes_project.services.Authentication;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;

namespace Notes_project.services
{
    public class UserService : IUserService
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserRepository _userRepository;
        private readonly IJwtProvider _jwtProvider;
        private readonly IHttpContextAccessor _contextAccessor;

        public UserService(IPasswordHasher passwordHasher,
            IUserRepository userRepository,
            IJwtProvider jwtProvider,
            IHttpContextAccessor httpContextAccessor)
        {
            _passwordHasher = passwordHasher;
            _userRepository = userRepository;
            _jwtProvider = jwtProvider;
            _contextAccessor = httpContextAccessor;
        }

        //метод, який відповідає за регістрацію користувача
        public async Task Register(string userName, string email, string password)
        {
            var hashedPassword = _passwordHasher.Generate(password);

            //далі треба зберегти user
            var user = User.Create(Guid.NewGuid(), userName, hashedPassword, email);

            //збереження user до бд
            _userRepository.AddTest(user).GetAwaiter().GetResult();
        }

        public async Task<string> Login(string email, string password)
        {
            //провірити email
            //var user = _userRepository.Get(u => u.Email == email);
            var user = await _userRepository.GetUser(email);

            //перевірити password
            var result = _passwordHasher.Verify(password, user.PasswordHash);

            if (result == false)
            {
                throw new Exception("Failed to login");
            }

            //створити JWT токен
            var jwtToken = _jwtProvider.GenerateToken(user);

            //положив токен у cookie, щоб можна було додати токен до запиту
            _contextAccessor.HttpContext.Response.Cookies.Append("2", jwtToken);

            //зберігти токен в cookie
            return jwtToken;
        }
    }
}