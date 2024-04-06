
export type ItemsList = {
    id: number,
    title: string,
    spending: number,
    date: string
    category: string
}

export type Item = Omit<ItemsList, 'id'>;

export type AppState = {
    itemsList: ItemsList[];
    filteredArray: ItemsList[];
}

export type SetItemsAction = {
    type: "SET_ITEMS",
    payload: ItemsList[];
}

export type AddItem = {
    type: 'ADD_ITEM',
    payload: Item
}

export type DeleteItem = {
    type: 'DELETE_ITEM',
    payload: number
}

export type FilterItems = {
    type: 'FILTER_ITEMS',
    payload: string
}


export type ActionTypes = SetItemsAction | AddItem | DeleteItem | FilterItems