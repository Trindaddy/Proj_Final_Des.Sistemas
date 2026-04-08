namespace ControleFinanceiro.Domain.Entities;

public class Category
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; } = string.Empty;
    
    public Guid UserId { get; private set; }
    public User User { get; private set; } = null!;

    public Category(string name, Guid userId)
    {
        Name = name;
        UserId = userId;
    }
}