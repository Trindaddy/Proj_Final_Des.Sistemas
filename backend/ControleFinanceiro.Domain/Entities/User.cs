namespace ControleFinanceiro.Domain.Entities;

public class User
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;

    // Relacionamentos
    public ICollection<Category> Categories { get; private set; } = new List<Category>();
    public ICollection<Transaction> Transactions { get; private set; } = new List<Transaction>();

    public User(string name, string email, string passwordHash)
    {
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
    }
}