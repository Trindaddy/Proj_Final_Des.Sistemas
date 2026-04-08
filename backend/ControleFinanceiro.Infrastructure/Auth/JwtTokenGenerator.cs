// ControleFinanceiro.Infrastructure/Auth/JwtTokenGenerator.cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ControleFinanceiro.Application.Services;
using ControleFinanceiro.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace ControleFinanceiro.Infrastructure.Auth;

public class JwtTokenGenerator : ITokenGenerator
{
    // Em um cenário real, a chave secreta deve vir do appsettings.json
    private const string SecretKey = "SuaChaveSuperSecretaMuitoLongaParaOJwtAqui!"; 

    public string GenerateToken(User user)
    {
        var handler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(SecretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(8),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }
}