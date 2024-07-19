using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.DataAccess.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        //T - Product
        IEnumerable<T> GetAll(Expression<Func<T, bool>>? filter = null, string? includeProperties = null);
        T Get(Expression<Func<T, bool>> filter, string? includeProperties = null);
        Task Add(T entity); //цей метод асинхронний черз Task
        Task Remove(T entity);

       
    }
}
