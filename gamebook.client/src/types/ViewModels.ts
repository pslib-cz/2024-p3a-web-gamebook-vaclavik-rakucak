export type ChainElement =
    | { type: "room"; data: Room }
    | { type: "hall"; data: Hall }
    | { type: "fork"; data: Fork };

export interface Room {
    id: number;
    type: string; // "traproom", "chestroom", "keyroom"
    description: string;
    dungeonId: number;
    imageId?: number;
    image?: ImageDto | null;
    isDeadEnd?: boolean;
    monster?: Monster;
    active?: boolean;
    roomItems?: RoomItem[];
    keyId?: Key;
    positionX?: number;
    positionY?: number;
    
}

export interface RoomItem {
    id: number;
    name: string;
    type: string; // "trap", "chest", "crate"
    description?: string;
    damage?: number;
    imageId: number;
    image?: ImageDto;
}

export interface Key {
    id: number;
    name: string;
    type: string;
    dungeonId: number;
    imageId: number;
    image?: ImageDto;
}

export interface Hall {
    id: number;
    imageId?: number;
    image?: ImageDto;
    roomId: number;
    room: Room;
    dungeonId: number;
}

export interface Fork {
    id: number;
    dungeonId: number;
    connections: ForkConnection[];
}

export interface ForkConnection {
    id: number;
    forkId: number;
    fork: Fork;
    connectedRoom: Room; 
    isDeadEnd: boolean;
}

export interface ImageDto {
    id: number;
    name: string;
    contentType: string;
}

export type Monster = {
    id: number;
    name: string;
    hitpoints: number;
    damage: number;
    imageId: number;
};

export interface Item {
    id: number;
    name: string;
    dmg: number;
    rarity: string;
    type: 'Weapon' | 'Shield' | 'Armor' | 'Miscellaneous';
    imageId: number;
    quantity?: number;
    price: number;
    bought?: boolean;
}

export interface Dungeon {
    id: number;
    name: string;
    description: string;
    rewardMoney: number;
    dmgCondition: number;
};