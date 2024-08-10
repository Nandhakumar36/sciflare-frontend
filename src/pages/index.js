import React,{useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Body from "../components/Body"


function Home() {
    const [isOpen,setIsopen] = useState(false)

    const toggle = () =>{
        setIsopen(!isOpen)
    }

    return (
        <div>
            <Sidebar isOpen = {isOpen} toggle={toggle}/>
            <Navbar toggle = {toggle}/>
            <Body />
        </div>
    )
}

export default Home
