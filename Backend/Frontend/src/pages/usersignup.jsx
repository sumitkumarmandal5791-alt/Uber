import axiosClinet from '../utils/axois';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAuth, registerUser } from '../../authSlice';

function UserSignupPage() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [scName, setSCName] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isAuthentication, user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuthentication) {
            navigate('/enterpage');
        }
    }, [isAuthentication, navigate])




    const handleSubmit = async (e) => {
        e.preventDefault();//prevent the page from loading
        const userData = {
            email,
            password,
            fullname: {
                firstname: name,
                lastname: scName
            }
        }
        dispatch(registerUser(userData));

        // setEmail('')
        // setPassword('')
        // setName('')
        // setEmail()
    }


    return (
        <div className='p-7 h-screen flex flex-col justify-center w-full bg-white'>
            <div className='flex justify-center mb-10'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
            </div>
            <h2 className='text-3xl font-bold mb-8 text-gray-800'>Create Account</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex gap-4 mb-2'>
                    <div className='w-1/2'>
                        <label className='block text-gray-700 font-medium mb-2 text-lg'>First Name</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='First Name'
                            className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black'
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className='block text-gray-700 font-medium mb-2 text-lg'>Last Name</label>
                        <input
                            required
                            type="text"
                            value={scName}
                            onChange={(e) => setSCName(e.target.value)}
                            placeholder="Last Name"
                            className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black'
                        />
                    </div>
                </div>
                <div>
                    <label className='block text-gray-700 font-medium mb-2 text-lg'>Email</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='email@example.com'
                        className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black'
                    />
                </div>
                <div>
                    <label className='block text-gray-700 font-medium mb-2 text-lg'>Password</label>
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                        className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black'
                    />
                </div>
                <button type="submit" className='w-full bg-black text-white py-4 rounded font-semibold text-lg mt-4'>
                    Sign Up
                </button>
            </form>
            <div className='mt-6 text-center'>
                <p className='text-gray-600 text-lg'>Already have an account? <Link to='/userlogin' className='text-blue-600 font-medium hover:underline'>Login here</Link></p>
            </div>
            <div className='mt-10 text-center'>
                <p className='text-xs text-gray-500'>
                    By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
                </p>
            </div>
        </div>
    )
}

export default UserSignupPage