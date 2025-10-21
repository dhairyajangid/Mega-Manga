import { FaSearch } from "react-icons/fa";
// import axios from 'axios';
function Header(){
    function signIn(){
        alert("signIn button clicked");
    }
    function logo(){
        return (<div>
            <img src="" alt="logo" />
            logo
            </div>)
    }
    return (
    <header className="h-[60px] w-full flex justify-between item-center bg-gray-500">
        <div>{logo}</div>
        <div className="flex items-center gap-2">
            <input className="w-[40vh] p-2 rounded-md outline-none border" type="text" placeholder="Search here.." /><FaSearch className="absolute right-0" />
        </div>
        <button onClick={signIn} className="bg-white text-gray-700 rounded-md hover:bg-gray-300 flex ">Signin</button>

    </header>
    )
}

export default Header;