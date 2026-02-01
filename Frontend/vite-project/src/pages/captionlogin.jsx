
import { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptionLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();//prevent the page from loading
        setUserData({ email, password })
        console.log(userData)

        setEmail('')
        setPassword('')
    }


    return (
        <div className='bg-white h-screen'>
            <img className='w-16 ml-8 mt-3 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                <h3 className='text-2xl font-bold mb-2'>What's your email</h3>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='eamil@example.com' className='mb-2 bg-gray-200 w-60%'></input>
                <h3 className='text-2xl font-bold mb-2'> Enter Password</h3>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='mb-2 bg-gray-200 w-60%'></input>
                <br></br>
                <button type="submit" className='flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-lg mt-5' >Login</button>
            </form>
            <p>New here? <a href='/captionsignup' className='text-blue-500'>Create new Account</a></p>

            <Link to='/userlogin' className='flex items-center justify-center w-full bg-green-500 text-white py-3 rounded-lg mt-5'>Sign in as User</Link>

        </div>
    )
}

export default CaptionLoginPage;