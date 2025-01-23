using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Gamebook.Server.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;

namespace Gamebook.Server.Models
{
    public class Dungeon
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? RewardMoney { get; set; }
        public string? DmgCondition { get; set; }
        public int? ImageId { get; set; }
        [ForeignKey("ImageId")]
        public Image? Image { get; set; }

    }
}


