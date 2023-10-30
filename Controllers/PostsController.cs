using cs_react.Models;
using cs_react.Utils;
using Microsoft.AspNetCore.Mvc;

namespace cs_react.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly ILogger<PostsController> _logger;
        private static List<Post> _posts = new List<Post>();

        public PostsController(ILogger<PostsController> logger)
        {
            _logger = logger;
        }

        public static void CreateRandom()
        {
            _posts = Enumerable.Range(1, 101).Select(index => CreateRandomPost(index)).ToList();
        }

        [HttpPost(nameof(Add))]
        public object Add(Post p)
        {
            _logger.LogDebug($"Add: {Info(p)}");
            _posts.Add(p);
            return new { };
        }

        [HttpPost(nameof(Edit))]
        public object Edit(Post p)
        {
            _logger.LogDebug($"Edit: {Info(p)}");
            var p1 = GetPost(p.id);
            p1.title = p.title;
            p1.body = p.body;
            return new { };
        }

        [HttpGet(nameof(Delete))]
        public object Delete(string id)
        {
            _logger.LogDebug($"Delete: id={id}");
            var p1 = GetPost(id);
            _posts.Remove(p1);
            return new { };
        }

        [HttpGet(nameof(Get))]
        public Post Get(string id)
        {
            _logger.LogDebug($"Get, id={id}");
            return GetPost(id);
        }

        private string Info(Post p)
        {
            return $"id={p.id}, date='{p.date}', title='{Max(p.title, 10)}', body='{Max(p.body, 10)}'";
        }

        private string? Max(string? s, int max)
        {
            if (s == null || s.Length <= max)
                return s;
            return s.Substring(0, max) + "...";
        }

        private Post GetPost(string? id)
        {
            var p1 = _posts.Find(i => i.id == id);
            if (p1 == null)
                throw new Exception("Post not found");
            return p1;
        }

        [HttpPost(nameof(GetPosts))]
        public PostsInfo GetPosts(GetPostData d)
        {
            _logger.LogDebug($"GetPosts: start={d.start}, count={d.count}, search={d.filter.search}, sort={d.filter.sort}");

            var filteredPosts = _posts;
            if (!string.IsNullOrEmpty(d.filter.search))
                filteredPosts = _posts.Where(p => (p.title ?? "").ToLower().Contains(d.filter.search.ToLower()) || (p.body ?? "").ToLower().Contains(d.filter.search.ToLower())).ToList();

            bool wasSort = false;
            if (!string.IsNullOrEmpty(d.filter.sort))
            {
                wasSort = true;
                if (d.filter.sort == "new")
                    filteredPosts.Sort((x, y) => -x.date.CompareTo(y.date));
                else if (d.filter.sort == "old")
                    filteredPosts.Sort((x, y) => x.date.CompareTo(y.date));
                else if (d.filter.sort == "asc")
                    filteredPosts.Sort((x, y) => (x.title ?? "").ToLower().CompareTo((y.title ?? "").ToLower()));
                else if (d.filter.sort == "desc")
                    filteredPosts.Sort((x, y) => -(x.title ?? "").ToLower().CompareTo((y.title ?? "").ToLower()));
                else
                    throw new Exception($"unknown sorting: {d.filter.sort}");
            }

            _logger.LogDebug($"GetPosts preparing: total=${_posts.Count}, filtred=${filteredPosts.Count}, wasSort=${wasSort}");

            if (d.count == -1 || d.start + d.count > filteredPosts.Count)
                d.count = filteredPosts.Count - d.start;
            var list = filteredPosts.GetRange(d.start, d.count);
            list.ForEach(p => _logger.LogDebug(Info(p)));
            return new PostsInfo { posts = list, total = filteredPosts.Count };
        }

        private static Post CreateRandomPost(int index)
        {
            var p = new Post();
            p.id = index.ToString();
            p.title = Lorem.LoremIpsum(3, 6, 1, 1, 1, 1).TrimEnd(' ', '.');
            p.body = Lorem.LoremIpsum(5, 10, 1, 2, 1, 4).TrimEnd(' ');
            p.date = DateTime.Now
                .AddDays(Random.Shared.Next(-200, 0))
                .AddHours(Random.Shared.Next(-200, 0))
                .AddMinutes(Random.Shared.Next(-200, 0))
                .AddSeconds(Random.Shared.Next(-200, 0));
            return p;
        }
    }
}
