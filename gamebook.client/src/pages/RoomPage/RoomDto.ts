export interface RoomGraphDto {
    roomId: number;
    roomType: string;
    roomDescription: string;
    imageId?: number;
    linkedHall: HallGraphDto | null;
}

export interface HallGraphDto {
    hallId: number;
    hallDescription: string;
    imageId?: number;
    nextRoom: RoomGraphDto | null;
}