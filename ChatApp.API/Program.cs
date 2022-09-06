using ChatApp.API.Controllers;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using ChatApp.API.Models;
using ChatApp.API.Services;
using ConfigurationManager = Microsoft.Extensions.Configuration.ConfigurationManager;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddDbContext<AppDBContext>(options => options.UseSqlServer(configuration.GetConnectionString("ConnStr")));

// var connection = Configuration.GetConnectionString("DefaultConnection");
// services.AddDbContext<ReportAppContext>(options => options.UseSqlServer(connection));

builder.Services.AddTransient<IBasicDataService, BasicDataService>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();
app.MapControllers();


// app.MapGet("/weatherforecast", () =>
// {
//     var forecast = Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateTime.Now.AddDays(index),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast");
// app.UseCors();
// app.UseRouting();
app.Run();

public record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}