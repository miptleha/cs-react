using System.Net;

namespace cs_react
{
    public class ErrorHandlerMiddlewareDev
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlerMiddlewareDev> _logger;

        public ErrorHandlerMiddlewareDev(RequestDelegate next, ILogger<ErrorHandlerMiddlewareDev> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                _logger.LogError(1, error, "CommonError");
                var response = context.Response;
                response.ContentType = "application/json";
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await response.WriteAsync($"{error.Message}\nStackTrace: {error.StackTrace}");
            }
        }
    }
}
