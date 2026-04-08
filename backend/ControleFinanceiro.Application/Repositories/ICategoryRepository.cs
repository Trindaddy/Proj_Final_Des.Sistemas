// ControleFinanceiro.Application/Reposiories/ICategoryRepository.cs
namespace ControleFinanceiro.Application.Repositories; // <-- Ajustado para o seu padrão!

using ControleFinanceiro.Domain.Entities;

public interface ICategoryRepository
{
    Task<Category> AddAsync(Category category);
    Task<List<Category>> GetByUserIdAsync(Guid userId);
}