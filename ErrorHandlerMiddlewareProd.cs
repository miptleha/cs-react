using System.Net;

namespace cs_react
{
    public class ErrorHandlerMiddlewareProd
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlerMiddlewareProd> _logger;

        public ErrorHandlerMiddlewareProd(RequestDelegate next, ILogger<ErrorHandlerMiddlewareProd> logger)
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
                await response.WriteAsync(error.Message);
            }
        }
    }
}
