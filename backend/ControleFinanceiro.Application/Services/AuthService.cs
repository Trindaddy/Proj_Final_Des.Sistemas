// ControleFinanceiro.Application/Services/AuthService.cs
using BCrypt.Net;
using ControleFinanceiro.Application.DTOs;
using ControleFinanceiro.Application.Repositories;
using ControleFinanceiro.Domain.Entities;

namespace ControleFinanceiro.Application.Services;

public class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenGenerator _tokenGenerator;

    public AuthService(IUserRepository userRepository, ITokenGenerator tokenGenerator)
    {
        _userRepository = userRepository;
        _tokenGenerator = tokenGenerator;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        if (await _userRepository.ExistsByEmailAsync(request.Email))
            throw new Exception("E-mail já cadastrado.");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        var user = new User(request.Name, request.Email, passwordHash);

        await _userRepository.AddAsync(user);

        var token = _tokenGenerator.GenerateToken(user);
        return new AuthResponse(token, user.Name, user.Email);
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new Exception("Credenciais inválidas.");

        var token = _tokenGenerator.GenerateToken(user);
        return new AuthResponse(token, user.Name, user.Email);
    }
}