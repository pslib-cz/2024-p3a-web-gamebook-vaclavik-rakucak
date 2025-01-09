public class HallGraphDto
{
    public int HallId { get; set; }
    public string HallDescription { get; set; }
    public int? ImageId { get; set; }
    public RoomGraphDto NextRoom { get; set; }
}