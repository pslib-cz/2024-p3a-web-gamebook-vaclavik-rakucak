using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
    public class Monster
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Hitpoints { get; set; }
        public int Damage { get; set; }
        public int ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image Image { get; set; }
    }

}
