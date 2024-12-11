using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Monster
    {
        [Key]
        public int IdMonster { get; set; }

        public required string Name { get; set; }

        public int Hitpoints { get; set; }

        public int Damage { get; set; }

        public required string Image { get; set; }

        [ForeignKey("Room")]
        public int IdRoom { get; set; }

        public Room Room { get; set; }
    }
}
