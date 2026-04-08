// ControleFinanceiro.Application/DTOs/TransactionDTOs.cs
using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Application.DTOs;

public record CreateTransactionRequest(decimal Amount, string Description, DateTime Date, TransactionType Type, Guid CategoryId);
public record TransactionResponse(Guid Id, decimal Amount, string Description, DateTime Date, string Type, string CategoryName);