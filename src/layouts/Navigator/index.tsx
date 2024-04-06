import {Outlet, NavLink} from "react-router-dom";
import './index.scss'
import {TiHomeOutline} from "react-icons/ti";
import {MdFastfood} from "react-icons/md";
import {FaCarAlt} from "react-icons/fa";
import {HiOutlineBookOpen} from "react-icons/hi";
import {RxDashboard} from "react-icons/rx";
import {TbPigMoney} from "react-icons/tb";
import {IoIosArrowDown} from "react-icons/io";
import Header from "../../components/Header";
import Statistic from "../../components/Statistic";


export default function Navigator() {
    return (
        <div className="nav-layout">
            <header>
                <nav>
                    <div className='logo-main-page'>
                        <NavLink className='nav-link' to='/'><TbPigMoney className='pig-icon icons'/> Finance
                            App</NavLink>
                    </div>
                    <div className='categories'>
                        <h2><RxDashboard className='icons'/>Categories</h2>
                        <span><IoIosArrowDown/></span>
                        <div className='links'>
                            <NavLink className='nav-link' to="home"><TiHomeOutline
                                className='icons'/> Home</NavLink>
                            <NavLink className='nav-link' to="food"> <MdFastfood
                                className='icons'/> Food</NavLink>
                            <NavLink className='nav-link' to='car'> <FaCarAlt className='icons'/> Car</NavLink>
                            <NavLink className='nav-link' to='education'> <HiOutlineBookOpen
                                className='icons'/> Education</NavLink>
                        </div>
                    </div>
                </nav>
            </header>
            <main className='main-outlet'>
                <Header/>
                <Outlet/>
            </main>
            <div className='second-outlet'>
                <Statistic/>
            </div>
        </div>
    );
}