using ControleFinanceiro.Application.DTOs;
using ControleFinanceiro.Application.Repositories;
using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Application.Services;

public class CategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<CategoryResponse> CreateAsync(CreateCategoryRequest request, Guid userId)
    {
        // Agora usamos o construtor da sua entidade!
        var category = new Category(request.Name, userId);

        await _repository.AddAsync(category);

        return new CategoryResponse 
        { 
            Id = category.Id, 
            Name = category.Name 
        };
    }

    public async Task<List<CategoryResponse>> GetUserCategoriesAsync(Guid userId)
    {
        var categories = await _repository.GetByUserIdAsync(userId);
        
        return categories.Select(c => new CategoryResponse 
        { 
            Id = c.Id, 
            Name = c.Name 
        }).ToList();
    }
}