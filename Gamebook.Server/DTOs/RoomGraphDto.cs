public class RoomGraphDto
{
    public int RoomId { get; set; }
    public string RoomType { get; set; }
    public string RoomDescription { get; set; }
    public int? ImageId { get; set; }
    public HallGraphDto LinkedHall { get; set; }
}
