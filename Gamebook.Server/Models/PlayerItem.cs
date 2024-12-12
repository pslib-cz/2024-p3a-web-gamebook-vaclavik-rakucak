using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gamebook.Server.Models
{
     public class PlayerItem
    {
        [Key]
        public int IdPlayerItem { get; set; }
        public int BaseStat { get; set; }

        public int BasePrice { get; set; }

        public int SpecEffectStat { get; set; }

        public required string SpecEffect { get; set; }
    }
}
