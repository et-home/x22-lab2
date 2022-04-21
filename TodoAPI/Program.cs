using Microsoft.EntityFrameworkCore;
using TodoApi.Model;
using Microsoft.Extensions.DependencyInjection;
using todo_api.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TodoDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TodoDbContext") ?? throw new InvalidOperationException("Connection string 'TodoDbContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// builder.Services.AddDbContext<TodoDBContext>(opt => opt.UseInMemoryDatabase("TodoData"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
