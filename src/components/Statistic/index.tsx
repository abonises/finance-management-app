import './index.scss'
import Chart from 'chart.js/auto'
import {useEffect, useRef} from "react";
import {categories} from "../../../data/constants.tsx";
import {useSelector} from "react-redux";
import {AppState} from "../../../models/models.ts";
const Index = () => {
    const chartRef = useRef<any>(null);
    const chartInstance = useRef<any>(null);

    const items = useSelector((state: AppState) => state.itemsList);
    const homeItems = items.filter((item) => item.category === 'Home');
    const foodItems =  items.filter((item) => item.category === 'Food');
    const carItems =  items.filter((item) => item.category === 'Car');
    const educationItems =  items.filter((item) => item.category === 'Education');

    const arraySpending: number[] = []
    const arrayCategories = [homeItems, foodItems, carItems, educationItems];
    arrayCategories.forEach((item) => arraySpending.push(item.reduce((sum, curr) => sum + curr.spending, 0)))
    const allAmount = arraySpending.reduce((sum, curr) => sum + curr, 0)

    useEffect(() => {
        if( chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: "doughnut",
            data: {
                labels: categories,
                datasets: [{
                    label: 'My First Dataset',
                    data: arraySpending,
                    backgroundColor: [
                        'rgb(255, 102, 163)',
                        'rgb(112,193,218)',
                        'rgb(255, 179, 102)',
                        'rgb(189,223,128)',
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                },
            },

        });
        return() => {
            if ( chartInstance.current ) {
                chartInstance.current.destroy()
            }

        }
    }, [items]);


    return (
        <div className='statistic-page'>
            <h1>Statistic</h1>
            <div className='total'>
                <span>-{allAmount.toLocaleString()} $ </span>
            </div>
            <div className='diagram'>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default Index;