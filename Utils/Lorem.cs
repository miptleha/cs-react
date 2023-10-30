using System.Text;

namespace cs_react.Utils
{
    public class Lorem
    {
        readonly static string[] words = new[]{"lorem", "ipsum", "dolor", "sit", "amet", "consectetuer",
        "adipiscing", "elit", "sed", "diam", "nonummy", "nibh", "euismod",
        "tincidunt", "ut", "laoreet", "dolore", "magna", "aliquam", "erat"};

        readonly static Random rand = new Random();

        public static string LoremIpsum(int minWords, int maxWords,
            int minSentences, int maxSentences,
            int minParagraphs, int maxParagraphs)
        {
            int numSentences = rand.Next(maxSentences - minSentences + 1) + minSentences;
            int numWords = rand.Next(maxWords - minWords + 1) + minWords;
            int numParagraphs = rand.Next(maxParagraphs - minParagraphs + 1) + minParagraphs;

            StringBuilder result = new StringBuilder();

            for (int p = 0; p < numParagraphs; p++)
            {
                for (int s = 0; s < numSentences; s++)
                {
                    for (int w = 0; w < numWords; w++)
                    {
                        if (w > 0) { result.Append(" "); }
                        result.Append(words[rand.Next(words.Length)]);
                    }
                    result.Append(". ");
                }
                if (p < numParagraphs - 1)
                    result.Append("\n");
            }

            return result.ToString();
        }
    }
}
