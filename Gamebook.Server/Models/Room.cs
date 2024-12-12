using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Room
    {
        [Key]
        public int IdRoom { get; set; }

        public required string Type { get; set; }

        public required string Image { get; set; }

        public required string Description { get; set; }

        [ForeignKey("Dungeon")]
        public int IdDungeon { get; set; }

        public required Dungeon Dungeon { get; set; }

        public required Hall Hall { get; set; }

        public required Monster Monster { get; set; }

        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
