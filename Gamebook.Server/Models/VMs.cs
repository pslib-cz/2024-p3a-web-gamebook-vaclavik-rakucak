using Gamebook.Server.Models;

public interface IChainElementVm
{
    string Type { get; set; }
    object Data { get; set; }
}

public class RoomElementVm : IChainElementVm
{
    public string Type { get; set; } = "room";
    public object Data { get; set; }

    public RoomElementVm(Room room)
    {
        Data = room;
    }
}
public class HallElementVm : IChainElementVm
{
    public string Type { get; set; } = "hall";
    public object Data { get; set; }

    public HallElementVm(Hall hall)
    {
        Data = hall;
    }
}
public class ForkElementVm : IChainElementVm
{
    public string Type { get; set; } = "fork";
    public object Data { get; set; }

    public ForkElementVm(ForkVm fork)
    {
        Data = fork;
    }
}
public class ForkVm
{
    public int Id { get; set; }
    public int DungeonId { get; set; }
    public List<ForkConnectionVm> Connections { get; set; } = new();
}
public class ForkConnectionVm
{
    public int Id { get; set; }
    public int ForkId { get; set; } // Můžete sem dát ID Forku, pokud ho potřebujete
    public Room ConnectedRoom { get; set; }
    public bool IsDeadEnd { get; set; }
}