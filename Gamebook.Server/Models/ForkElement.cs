namespace Gamebook.Server.Models;

public class ForkElement : ChainElement
{
    public Fork Data { get; set; }
    public IReadOnlyList<ForkConnectionElement> Connections { get; set; }

    public ForkElement(Fork fork)
    {
        Type = "fork";
        Data = fork;
        Connections = fork.Connections.Select(fc => new ForkConnectionElement
        {
            Room = fc.ConnectedRoom,
            IsDeadEnd = fc.IsDeadEnd
        }).ToList();
    }
}

public class ForkConnectionElement
{
    public Room Room { get; set; }
    public bool IsDeadEnd { get; set; }
}