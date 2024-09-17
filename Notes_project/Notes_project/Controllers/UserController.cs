using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Notes_project.Models;
using Notes_project.services.Authentication;
using ProjectTrackingSpotify.DataAccess.Repository.IRepository;
using System.Security.Claims;

namespace Notes_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;

        public UserController(IUserRepository userRepository, IUserService userService)
        {
            _userRepository = userRepository;
            _userService = userService;

        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserLoginDTO user)
        {
            var JwtToken = _userService.Login(user.Email, user.Password);
            return Ok(JwtToken);
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] UserDTO user)
        {
            var JwtToken = _userService.Register(user.UserName, user.Email, user.Password);
            return Ok(JwtToken);
        }

        [HttpGet("GetUserData")]
        [Authorize]
        public IActionResult GetUserData() 
        {
            var userIdClaim = User.FindFirst("userId");
            if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }
            var user = _userRepository.Get(u => u.Id == userId);

            return Ok(new { user.UserName, user.Email, user.UserPhoto });
        }

        [HttpPost("UploadUserPhoto")]
        [Authorize]
        public IActionResult UploadUserPhoto([FromBody] string userPhoto)
        {
            var userIdClaim = User.FindFirst("userId");
            if (Guid.TryParse(userIdClaim.Value, out Guid userId)) { }

            var user = _userRepository.Get(u => u.Id == userId);
            user.UserPhoto = userPhoto;

            _userRepository.Save();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAllUser() 
        {
            var users = _userRepository.GetAll();

            return Ok(users);
        }

    }
}
