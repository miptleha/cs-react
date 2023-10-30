using cs_react;
using cs_react.Controllers;
using NLog;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Logging.ClearProviders();
builder.Host.UseNLog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseMiddleware<ErrorHandlerMiddlewareProd>();
}
else
{
    app.UseMiddleware<ErrorHandlerMiddlewareDev>();
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

logger.Debug("Create random posts");
PostsController.CreateRandom();

app.Run();

LogManager.Shutdown();