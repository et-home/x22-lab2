namespace TodoApi.Model;

public class TodoItem{
    public uint TodoItemId { get; set; }
    public string? Task { get; set; }
    public string? Instruction { get; set; }
    public DateTime Deadline { get; set; } = DateTime.Today;
    public Priority Priority{ get; set; }
    public bool IsComplete { get; set; } = false;
}

public enum Priority {Low, Medium, High}