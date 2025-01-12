// src/types/RoomDto.ts

export interface ImageDto {
    id: number;
    name: string;
    data: string; // Base64 encoded string, případně upravte podle potřeby
    contentType: string;
  }
  
  export interface RoomDto {
    id: number;
    type: string; // "empty", "key", "chest", "monster", atd.
    description: string;
    dungeonId: number;
    imageId?: number;
    image?: ImageDto;
  }
  
  export interface HallDto {
    id: number;
    imageId?: number;
    image?: ImageDto;
    roomId: number;
    room: RoomDto; // V HallDto je odkaz na RoomDto
    dungeonId: number;
  }
  
  export interface ForkDto {
    type: "fork";
    data: RoomDto[];
  }
  
  // Společný typ pro všechny typy v chainu
  export type ChainItemDto =
    | { type: "room"; data: RoomDto }
    | { type: "hall"; data: HallDto }
    | ForkDto;