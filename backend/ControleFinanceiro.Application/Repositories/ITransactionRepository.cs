using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Application.Repositories;

public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction);
    Task<IEnumerable<Transaction>> GetAllByUserIdAsync(Guid userId);
    Task DeleteAsync(Guid id, Guid userId);
}