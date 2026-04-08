namespace ControleFinanceiro.Domain.Entities;

public enum TransactionType { Income, Expense }

public class Transaction
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public decimal Amount { get; private set; }
    public string Description { get; private set; } = string.Empty;
    public DateTime Date { get; private set; }
    public TransactionType Type { get; private set; }

    // Relacionamentos
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = null!;
    
    public Guid UserId { get; private set; }
    public User User { get; private set; } = null!;

    public Transaction(decimal amount, string description, DateTime date, TransactionType type, Guid categoryId, Guid userId)
    {
        if (amount <= 0) 
            throw new ArgumentException("O valor deve ser maior que zero."); // RN01

        Amount = amount;
        Description = description;
        Date = date;
        Type = type;
        CategoryId = categoryId;
        UserId = userId;
    }
}