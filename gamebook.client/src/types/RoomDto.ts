export interface ImageDto {
  id: number;
  name: string;
  data: string; // Base64 encoded string
  contentType: string;
}

export interface RoomDto {
  id: number;
  type: string;
  description: string;
  dungeonId: number;
  imageId?: number;
  image?: ImageDto | null;
  isDeadEnd?: boolean;
}

export interface HallDto {
  id: number;
  imageId?: number;
  image?: ImageDto;
  roomId: number;
  room: RoomDto;
  dungeonId: number;
}

export interface ForkData {
  room: RoomDto;
  isDeadEnd: boolean;
}

export interface ForkDto {
  id: number;
  type: "fork";
  data: ForkData[];
}

export type ChainItemDto =
  | { type: "room"; data: RoomDto; isDeadEnd?: boolean }
  | { type: "hall"; data: HallDto }
  | {type: "fork"; data: ForkDto };