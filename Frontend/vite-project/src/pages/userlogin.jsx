import { Link } from 'react-router-dom'
import { useState } from 'react'
function UserLoginPage() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captionData, setCaptionData] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();//prevent the page from loading
        setCaptionData({ email, password })
        console.log(captionData)

        setEmail('')
        setPassword('')
    }


    return (
        <div className='bg-white h-screen'>
            <img className='w-16 ml-8 mt-3 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <form onSubmit={handleSubmit}>
                <h3 className='text-2xl font-bold mb-2'>What's your email</h3>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='eamil@example.com' className='mb-2 bg-gray-200 w-60%'></input>
                <h3 className='text-2xl font-bold mb-2'> Enter Password</h3>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='mb-2 bg-gray-200 w-60%'></input>
                <br></br>
                <button type="submit" className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5' >Login</button>
            </form>
            <p>New here? <a href='/usersignup' className='text-blue-500'>Create new Account</a></p>

            <Link to='/captionlogin' className='flex items-center justify-center w-full bg-yellow-500 text-white py-3 rounded-lg mt-5'>Sign in as Caption</Link>

        </div>
    )
}

export default UserLoginPage;