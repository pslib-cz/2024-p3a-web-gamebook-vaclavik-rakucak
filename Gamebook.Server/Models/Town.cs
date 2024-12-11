using System.Reflection.Metadata;

namespace Gamebook.Server.Models
{
    public class Town
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Image { get; set; }

    }
}
