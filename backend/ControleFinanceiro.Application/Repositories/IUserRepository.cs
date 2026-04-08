using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Application.Repositories;

public interface IUserRepository
{
    Task<bool> ExistsByEmailAsync(string email);
    Task AddAsync(User user);
    Task<User?> GetByEmailAsync(string email);
}