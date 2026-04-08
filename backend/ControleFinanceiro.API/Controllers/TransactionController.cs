// ControleFinanceiro.API/Controllers/TransactionController.cs
using System.Security.Claims;
using ControleFinanceiro.Application.DTOs;
using ControleFinanceiro.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControleFinanceiro.API.Controllers;

[Authorize] // Protege todas as rotas deste controller
[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly TransactionService _transactionService;

    public TransactionController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    // Método auxiliar para extrair o ID do utilizador logado do token JWT
    private Guid GetUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.Parse(userId!);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTransactionRequest request)
    {
        try
        {
            var response = await _transactionService.CreateAsync(request, GetUserId());
            return Created("", response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var transactions = await _transactionService.GetUserTransactionsAsync(GetUserId());
        return Ok(transactions);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _transactionService.DeleteAsync(id, GetUserId());
        return NoContent(); // Retorna 204 (Sucesso, sem conteúdo)
    }
}