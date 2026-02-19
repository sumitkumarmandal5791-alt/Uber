import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../authSlice'

function userLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthentication, user } = useSelector((state) => state.auth)



    useEffect(() => {
        if (isAuthentication) {
            navigate('/enterpage');
        }
    }, [isAuthentication, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();//prevent the page from loading
        const userData = { email, password }
        dispatch(loginUser(userData));

        setEmail('')
        setPassword('')
    }


    return (
        <div className='p-7 h-screen flex flex-col justify-center w-full bg-white'>
            <div className='flex justify-center mb-10'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
            </div>
            <h2 className='text-3xl font-bold mb-8 text-gray-800'>Welcome Back</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                    Login
                </button>
            </form>
            <div className='mt-6 text-center'>
                <p className='text-gray-600 text-lg'>New here? <Link to='/usersignup' className='text-blue-600 font-medium hover:underline'>Create new Account</Link></p>
            </div>
            <div className='mt-6'>
                <Link to='/captionlogin' className='flex items-center justify-center w-full bg-green-600 text-white py-4 rounded font-semibold text-lg hover:bg-green-700'>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default userLoginPage;