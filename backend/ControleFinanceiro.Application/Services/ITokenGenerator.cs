// ControleFinanceiro.Application/Services/ITokenGenerator.cs
using ControleFinanceiro.Domain.Entities;
namespace ControleFinanceiro.Application.Services;

public interface ITokenGenerator
{
    string GenerateToken(User user);
}