import React from 'react'
import Cat from '../assets/user.webp'
import { Pen, Trash } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const UserProfile = ({ data, setUserList, setModal, userList ,setUser}) => {
    const { age, name, _id } = data;

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
            toast.success(response.data.message);
            setUserList((prev) => prev.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete user");
        }
    };

    const handleEdit = (id) => {
    const findUser = userList.find((user) => user._id === id);
    setUser(findUser); 
    setModal(true);    
};

    return (
        <div className=' flex flex-row gap-4 cursor-pointer relative hover:shadow-xl ease-linear transition-all h-[80px] bg-white rounded-[8px]  p-2'>
            <img src={Cat} alt='bgke;k' className=' w-[60px] h-[60px] rounded-full bg-emerald-200' />
            <span className=' flex  flex-col'>
                <p className=' text-xl font-semibold capitalize'>{name}</p>
                <p className=' text-lg font-semibold'>{age}</p>
            </span>
            <Pen onClick={() => handleEdit(_id)} size={20} className='absolute right-2 top-12' />
            <Trash onClick={() => handleDelete(_id)} size={20} className='  absolute right-2 top-2 ' />
        </div>
    )
}

export default UserProfile