using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace Gamebook.Server.Models
{
    public class Town
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }

        public int? ParentTownId { get; set; }
        [ForeignKey("ParentTownId")]
        public Town? ParentTown { get; set; }

        public ICollection<Town> ChildTowns { get; set; }

    }
}
