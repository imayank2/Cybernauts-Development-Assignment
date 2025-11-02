import React, { useEffect, useState } from 'react'
import { CirclePlus, X } from 'lucide-react';
import UserProfile from '../components/userProfile';
import { toast } from 'react-toastify';
import UserGraph from '../components/UserGraph';
import axios from "axios";


const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userList, setUserList] = useState([{ name: "Jon Doe", age: 10, hobbies: "video Game" }]);
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({
        name: "",
        age: "",
        hobbies: ""
    })

    const hanldeModal = () => {
        setModal(!modal);
    }

    const handleUserChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(values => ({ ...values, [name]: value }))
    }

    const handleCreateUser = async () => {
        const { name, age, hobbies } = user;

        // Validate input
        if (!name || !age || !hobbies) {
            toast.warn("All 3 fields are required!");
            return;
        }

        try {
            // Send POST request to backend
            const { data } = await axios.post("https://cybernauts-development-assignment-nfhn.onrender.com/api/users", {
                name,
                age,
                hobbies
            });

            // Update UI only if API call is successful
            setUserList((prev) => [...prev, data.user]);

            toast.success(`${data.user.name} | ${data.user.age} added successfully!`);

            // Close modal and reset input fields
            setModal(false);
            setUser({
                name: "",
                age: "",
                hobbies: "",
            });


        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Failed to create user!");
        }
    };

    const filteredUsers = userList?.filter(user =>
        user.hobbies.toLowerCase().includes(searchTerm.toLowerCase())
    ).reverse();


    useEffect(() => {
        const handleFetch = async () => {
            const data = await axios.get("https://cybernauts-development-assignment-nfhn.onrender.com/api/users/");
            setUserList(data.data.users)
        }
        handleFetch();
    }, []);

    const handleUpdateUser = async () => {
        const { _id, name, age, hobbies } = user;
        try {
            const { data } = await axios.put(`https://cybernauts-development-assignment-nfhn.onrender.com/api/users/${_id}`, {
                name, age, hobbies
            });

            setUserList(prev => prev.map(u => u._id === _id ? data.user : u));
            toast.success("User updated successfully!");

            setModal(false);
            setUser({ name: "", age: "", hobbies: "" }); // reset form
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user");
        }
    };


    return (
        <div className=' flex gap-5  bg-white relative p-[16px] w-[95%] rounded-[8px] shadow-md m-auto h-[700px]'>
            <div className=' bg-[#f2f2f2]  w-[320px]   p-1 h-[100%] rounded-r-xl '>
                <div className=' flex justify-between px-2 p-2 items-center'>
                    <h1 className=' text-2xl text-black font-bold px-2 '>Users</h1>
                    <span onClick={hanldeModal} className=' flex justify-center cursor-pointer items-center  rounded-[16px] bg-blue-500 w-[35px] h-[35px]'>
                        <CirclePlus size={25} color='white' />
                    </span>
                </div>
                <div className='MainUserBox flex flex-col gap-2 overflow-scroll h-[92%]'>
                    {
                        userList?.reverse()?.map((user, idx) => {
                            return (
                                <div key={idx}>
                                    <UserProfile data={user} setUserList={setUserList} setModal={setModal} userList={userList} setUser={setUser} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className=' bg-[#f2f2f2] p-5 rounded-[8px] w-[70%]'>
                <UserGraph users={userList} />
            </div>

            <div className=' bg-[#f2f2f2]  w-[320px]   p-1 h-[100%] rounded-l-xl '>
                <div className=' flex justify-between px-2 p-2 items-center'>
                    <h1 className=' text-2xl text-black font-bold '>Hobbies</h1>
                </div>
                <div className='MainUserBox flex flex-col gap-2 overflow-scroll h-[92%]'>
                    <input
                        className='py-2 rounded-sm outline-none shadow-md w-full px-4 bg-white'
                        type="text"
                        placeholder='Search'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {
                        filteredUsers.map((user, idx) => (
                            <div
                                key={idx}
                                className='flex justify-start items-center capitalize font-semibold bg-white p-2 h-[50px] rounded-[4px] hover:shadow-md'
                            >
                                <p className='px-2'>{user.hobbies}</p>
                            </div>
                        ))
                    }
                </div>

            </div>

            {
                modal && (
                    <div className='bg-white/60 border border-gray-200 backdrop-blur-md  w-[100%] rounded-[8px]    m-4 absolute top-0 h-[100%] left-0 p-[32px]'>
                        <X size={25} className=' flex justify-end absolute rounded-[4px] cursor-pointer  bg-white p-1' onClick={() => setModal(!modal)} />
                        <div className=' mt-10 bg-white rounded-[16px] h-[95%] w-full sm:w-[50%] m-auto flex gap-4 p-4 flex-col'>
                            <p className=' px-1'>Enter Name</p>
                            <input value={user.name} name="name" onChange={(e) => handleUserChange(e)} className=' py-3 outline-none shadow bg-white rounded-[4px] px-4' type="text" placeholder='Enter name' />
                            <p className=' px-1'>Enter Age</p>
                            <input value={user.age} name="age" onChange={(e) => handleUserChange(e)} className=' py-3 outline-none shadow bg-white rounded-[4px] px-4' type="number" placeholder='Enter age' />
                            <p className=' px-1'>Enter Hobbies</p>
                            <input value={user.hobbies} name="hobbies" onChange={(e) => handleUserChange(e)} className=' py-3 outline-none shadow bg-white rounded-[4px] px-4' type="text" placeholder='Enter hobbies' />
                            <button
                                onClick={user._id ? handleUpdateUser : handleCreateUser}
                                className='w-full py-3 text-white outline-none shadow bg-orange-400 rounded-[8px] text-lg font-semibold cursor-pointer'
                            >
                                {user._id ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Home

