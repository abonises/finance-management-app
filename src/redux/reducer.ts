import {ActionTypes, ItemsList} from "../../models/models.ts";
import {isToday, isWithinInterval, subDays} from 'date-fns';


const initialState: {
    itemsList: ItemsList[],
    filteredArray: ItemsList[],
} = {
    itemsList: [],
    filteredArray: [],
};

function spendingReducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                ...state,
                itemsList: action.payload,
                filteredArray: action.payload, // Сохраняем копию в filteredArray
            };
        case "ADD_ITEM":
            return {
                ...state,
                itemsList: [...state.itemsList, action.payload],
                filteredArray: [...state.itemsList, action.payload], // Обновляем и отфильтрованный массив
            };
        case "DELETE_ITEM":
            return {
                ...state,
                itemsList: state.itemsList.filter((item) => item.id !== action.payload),
                filteredArray: state.itemsList.filter((item) => item.id !== action.payload), // Обновляем и отфильтрованный массив
            };
        case "FILTER_ITEMS":
            const today = new Date();
            switch (action.payload) {
                case 'TODAY':
                    return {
                        ...state,
                        filteredArray: state.itemsList.filter(item => isToday(new Date(item.date)))
                    };
                case '7_DAYS':
                    const last7Days = subDays(today, 7);
                    return {
                        ...state,
                        filteredArray: state.itemsList.filter(item => isWithinInterval(new Date(item.date), { start: last7Days, end: today }))
                    };
                case '30_DAYS':
                    const last30Days = subDays(today, 30);
                    return {
                        ...state,
                        filteredArray: state.itemsList.filter(item => isWithinInterval(new Date(item.date), { start: last30Days, end: today }))
                    };
                case 'ALL_TIME':
                return {
                    ...state,
                    filteredArray: state.itemsList
                };
                default:
                    return state;
            }
        default:
            return state;
    }
}

export default spendingReducer;