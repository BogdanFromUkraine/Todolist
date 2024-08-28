﻿using Notes_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.DataAccess.Repository.IRepository;

namespace ProjectTrackingSpotify.DataAccess.Repository.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        public  Task<HashSet<Notes_project.Enum.Permission>> GetUserPermission(Guid userId);

        public Task AddTest(User user);
    }
}
