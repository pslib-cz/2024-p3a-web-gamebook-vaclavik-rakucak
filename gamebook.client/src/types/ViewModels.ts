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
    roomItemId?: number;
    roomItems?: RoomItem;
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
    quantity?: number;
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
    type: 'Weapon' | 'Shield' | 'Armor' | 'Miscellaneous' | 'Key';
    imageId: number;
    quantity?: number;
    price: number;
    bought?: boolean;
    dungeonId?: number;
}

export interface Dungeon {
    id: number;
    name: string;
    description: string;
    rewardMoney: number;
    dmgCondition: number;
};

export interface Quest {
    id: number;
    name: string;
    description: string;
    condition: string; // Typ úkolu: "completeDungeon", "killMonster", "collectItem"
    conditionValue: number;
    progress: number; 
    dungeonId?: number;
    monsterId?: number;
    roomItemId?: number;
    npcId: number;
    rewardItemId: number;
    imageId: number;
    conditionDescription: string;
    rewardItem: Item;
};