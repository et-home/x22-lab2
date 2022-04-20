using Microsoft.EntityFrameworkCore;

namespace TodoApi.Model;

public class TodoDBContext : DbContext
{
    public TodoDBContext(DbContextOptions<TodoDBContext> options):base(options)
    {
    }

    public DbSet<TodoItem>? TodoItems { get; set; }
}