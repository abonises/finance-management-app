import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import spendingReducer from "./redux/reducer.ts";
import {categories} from "../data/constants.tsx";

// Layouts

import Navigator from "./layouts/Navigator";

// Components

import MainPage from "./components/MainPage";
import CategoryComponent from "./components/CategoryComponent";

// Router elements

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Navigator/>}>
            <Route index element={<MainPage/>}/>
            {categories.map((item) => (
                <Route key={item} path={item} element={<CategoryComponent category={item} />} />
            ))}
        </Route>
    )
)

const store = configureStore({
    reducer: spendingReducer
})

function App() {
    return (
        <Provider store={store}>
            <div className='app'>
                <main>
                    <RouterProvider router={router}/>
                </main>
            </div>
        </Provider>

    )
}

export default App;
