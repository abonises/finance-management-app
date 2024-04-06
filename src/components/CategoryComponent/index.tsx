// libraries

import {useEffect, useState} from "react";
import cn from "classnames";
import { format } from 'date-fns'
import axios from "axios";

// redux

import {addItem, deleteItem, filterItemsByDate, setItems} from "../../redux/actions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../models/models.ts";
import {API_URL} from "../../../data/constants.tsx";

// design

import './index.scss'
import {FaTrashAlt} from "react-icons/fa";

type Props = {
    category: string
}

const Index = ({ category }: Props) => {
    const [allAmountCategory, setAllAmountCategory] = useState<number>(0);
    const [activeAddBox, setActiveAddBox] = useState<boolean>(false);
    const [newSpendingTitle, setNewSpendingTitle] = useState<string>('');
    const [newSpendingAmount, setNewSpendingAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // dispatch

    const dispatch = useDispatch();
    const allSpendingList = useSelector((state: AppState) => state.itemsList);
    const spendingListWithFilter = useSelector((state: AppState) => state.filteredArray);

    // filter by category

    const filteredAllSpendingList = allSpendingList.filter((item) => item.category === category)
    const filteredItems = spendingListWithFilter.filter((item) => item.category === category)

    // sum of all spending

    useEffect(() => {
        const allAmount = filteredAllSpendingList.reduce((sum, curr) => sum + curr.spending, 0);
        setAllAmountCategory(allAmount);
    }, [filteredItems]);

    // fetch list

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data;

                dispatch(setItems(data));

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        setTimeout(() => {
            (async () => await fetchItems())();
        }, 1500)

    }, []);


    // addItem

    const handleAddNewSpending =  async () => {

        // newItem
        const newItem = {
            title: newSpendingTitle,
            spending: newSpendingAmount,
            date: format(new Date(), "MM.dd.yyyy").toString(),
            category: category,
        }

        try {
            const response = await axios.post(API_URL, newItem)

            dispatch(addItem(response.data));

        } catch(err) {
            console.log(err)
        }

        setActiveAddBox(false);
        setNewSpendingTitle('');
        setNewSpendingAmount(0);
    }

    // deleteItem

    const handleDeleteSpending = async (id: number) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`)

            dispatch(deleteItem(response.data.id));
        } catch (err) {
            console.log(err)
        }
    }

    const handleFilterByDate = (filter: string) => {
        dispatch(filterItemsByDate(filter))
    }

    return (
        <div className='new-page'>
            {isLoading && <h3 className='loading-page'>Loading page...</h3>}
            {!isLoading &&
                <div className='stats-page'>
                  <div className='header-page'>
                    <h1>{category} Spending</h1>
                    <div className={cn('add-box', activeAddBox && 'disabled')}>
                      <h2>Add New</h2>
                      |
                      <button className='button-add' onClick={() => setActiveAddBox(prev => !prev)}>Add</button>
                    </div>
                  </div>
                  <div className={cn('box-for-add', activeAddBox && 'active')}>
                    <h1>Add New</h1>
                    <div className='box-for-add__input'>
                      <input className='input-text' value={newSpendingTitle}
                             onChange={(e) => setNewSpendingTitle(e.target.value)} placeholder='Title'
                             type="text"/>
                      <input className='input-amount' value={newSpendingAmount}
                             onChange={(e) => {
                                 setNewSpendingAmount(parseInt(e.target.value))
                             }} placeholder='Amount'
                             type="number"/>
                      <button className='button-add' onClick={() => handleAddNewSpending()}>Add</button>
                    </div>
                  </div>
                  <div className='data-container'>
                    <button onClick={() => handleFilterByDate('TODAY')}>Today</button>
                    <button onClick={() => handleFilterByDate('7_DAYS')}>Week</button>
                    <button onClick={() => handleFilterByDate('30_DAYS')}>Month</button>
                    <button onClick={() => handleFilterByDate('ALL_TIME')}>All Time</button>
                  </div>
                  <div className='spending-container'>
                    <div className='properties'>
                      <span>Id</span>
                      <span>Title</span>
                      <span>Amount</span>
                      <span>Date</span>
                    </div>
                    <div className='spending-box'>
                      <ul className='spending-list'>
                          {filteredItems.map(({id, title, spending, date}, i) => (
                              <li key={id}>
                                  <span>{i + 1}</span>
                                  <p>{title}</p>
                                  <span>-{spending} $</span>
                                  <span>{date}</span>
                                  <button onClick={() => handleDeleteSpending(id)}><FaTrashAlt/></button>
                              </li>
                          )).reverse()}
                      </ul>
                    </div>
                  </div>
                  <div className='total'>
                    <h3>{!allAmountCategory ? <span></span> : <span>Total Spending: -{allAmountCategory.toLocaleString()} $</span>}</h3>
                  </div>
                </div>
            }
        </div>
    );
};

export default Index;