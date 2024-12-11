namespace Gamebook.Server.Models
{
     public class Dungeon
    {
        [Key]
        public int IdDungeon { get; set; }

        [Required]
        public string Name { get; set; }

        public int MaxRooms { get; set; }

        public string Description { get; set; }

        public string Reward { get; set; }

        public string DmgCondition { get; set; }

        public ICollection<Room> Rooms { get; set; } = new List<Room>();

        public ICollection<Quest> Quests { get; set; } = new List<Quest>();
    }
}
