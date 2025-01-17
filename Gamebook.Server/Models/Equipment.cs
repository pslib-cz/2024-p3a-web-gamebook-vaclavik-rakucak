using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gamebook.Server.Models
{
    public class Equipment
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int? Price { get; set; }
        public string Rarity { get; set; }
        public int Dmg { get; set; }
        public int? SpecialEffectId { get; set; }
        [ForeignKey("SpecialEffectId")]
        public SpecialEffect? SpecialEffect { get; set; }
        public int ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image Image { get; set; }

    }
}
