namespace cs_react.Models
{
    public class GetPostData
    {
        public int start { get; set; }
        public int count { get; set; }
        public FilterData filter { get; set; } = new FilterData();
    }

    public class FilterData
    {
        public string? sort { get; set; }
        public string? search { get; set; }
    }
}
