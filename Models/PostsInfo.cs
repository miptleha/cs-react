namespace cs_react.Models
{
    public class PostsInfo
    {
        public IEnumerable<Post> posts { get; set; } = new List<Post>();
        public int total { get; set; }
    }
}
