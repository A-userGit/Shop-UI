export interface Item {
    name: string;
    price: number;
    id: bigint;
    deleted: boolean;
}

export interface BasketItem{
    item: Item;
    amount: number;
}

export interface SimpleUser{
    name: string;
    surname: string;
    id: bigint;
    email: string;
}

export interface OrderItem{
    id: bigint;
    amount: number;
}

export interface OrderCreationData{
    email: string;
    items: OrderItem[];
}

export interface OrderedItem{
    itemName: string;
    amount: number;
}

export interface OrderData{
    id: bigint;
    status: string;
    createdAt: Date;
    items: OrderedItem[];
}

export interface UserInfo{
    name: string;
    surname: string;
    birthDate: Date;
    email: string;
}

export interface SingnUpState{
    name: string;
    surname: string;
    email: string;
    password: string;
    birthDate: string;
    error: string;
    return: boolean;
}