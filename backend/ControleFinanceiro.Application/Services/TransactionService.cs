// ControleFinanceiro.Application/Services/TransactionService.cs
using ControleFinanceiro.Application.DTOs;
using ControleFinanceiro.Application.Repositories;
using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Application.Services;

public class TransactionService
{
    private readonly ITransactionRepository _repository;

    public TransactionService(ITransactionRepository repository)
    {
        _repository = repository;
    }

    public async Task<TransactionResponse> CreateAsync(CreateTransactionRequest request, Guid userId)
    {
        var transaction = new Transaction(request.Amount, request.Description, request.Date, request.Type, request.CategoryId, userId);
        await _repository.AddAsync(transaction);

        return new TransactionResponse(transaction.Id, transaction.Amount, transaction.Description, transaction.Date, transaction.Type.ToString(), "Categoria");
    }

    public async Task<IEnumerable<TransactionResponse>> GetUserTransactionsAsync(Guid userId)
    {
        var transactions = await _repository.GetAllByUserIdAsync(userId);
        return transactions.Select(t => new TransactionResponse(t.Id, t.Amount, t.Description, t.Date, t.Type.ToString(), t.Category?.Name ?? "Sem Categoria"));
    }
    
    public async Task DeleteAsync(Guid transactionId, Guid userId)
    {
        await _repository.DeleteAsync(transactionId, userId);
    }
}