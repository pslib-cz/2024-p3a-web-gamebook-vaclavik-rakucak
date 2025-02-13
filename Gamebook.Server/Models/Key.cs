using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Key : Equipment
    {
        public int DungeonId { get; set; }
        [ForeignKey("DungeonId")]
        public Dungeon Dungeon { get; set; }
    }
}