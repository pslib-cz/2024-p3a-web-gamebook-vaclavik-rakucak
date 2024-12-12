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
        public int IdDungeon { get; set; }

        [Required]
        public required string Name { get; set; }

        public int MaxRooms { get; set; }

        public required string Description { get; set; }

        public required int Reward { get; set; }

        public required int DmgCondition { get; set; }

        public ICollection<Room> Rooms { get; set; } = new List<Room>();

        public ICollection<Quest> Quests { get; set; } = new List<Quest>();
    }

}
