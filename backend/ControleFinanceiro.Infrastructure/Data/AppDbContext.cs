using Microsoft.EntityFrameworkCore;
using ControleFinanceiro.Domain.Entities; // Ajuste se o namespace das suas entidades for diferente

namespace ControleFinanceiro.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    // --- ADICIONE ESTE BLOCO ABAIXO ---
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Desativa a deleção em cascata globalmente para evitar o erro do SQL Server
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
}