using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Hall
    {
        [Key]
        public int IdRoom { get; set; }

        public required string Type { get; set; }

        public required string Image { get; set; }

        public required string Description { get; set; }

        [ForeignKey("Dungeon")]
        public int IdDungeon { get; set; }

        public Dungeon Dungeon { get; set; }
    }
}
