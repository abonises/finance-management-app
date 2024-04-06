import {ItemsList, Item} from "../../models/models.ts";

export const setItems = (spending: ItemsList[]) => ({
    type: 'SET_ITEMS',
    payload: spending
})

export const addItem = (item: Item) => ({
    type: 'ADD_ITEM',
    payload: item
})

export const deleteItem = (id: number) => ({
    type: 'DELETE_ITEM',
    payload: id
})

export const filterItemsByDate = (filter: string) => ({
    type: 'FILTER_ITEMS',
    payload: filter
})