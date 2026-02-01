import { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptionSignupPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setlastname] = useState('');
    const [userData, setUserData] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();//prevent the page from loading
        setUserData({
            fullname: {
                firstname: name,
                lastname: lastname
            },
            email: email,
            password: password
        })

        setEmail('')
        setPassword('')
        setName('')
    }

    return (
        <>
            <div className='bg-white h-screen'>
                <img className='w-16 ml-8 mt-3 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
                <form onSubmit={handleSubmit} >

                    <h3 className='text-2xl font-bold mb-2'>What's your name</h3>
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Firstname' className='mb-2 bg-gray-200 w-50% mr-2 '></input>
                    <input required type="text" value={scName} onChange={(e) => setlastname(e.target.value)} placeholder="secondname" className=' ml-1 mb-2 bg-gray-200 w-50%'></input>
                    <h3 className='text-2xl font-bold mb-2'>What's your email</h3>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='eamil@example.com' className='mb-2 bg-gray-200 w-60%'></input>
                    <h3 className='text-2xl font-bold mb-2'> Enter Password</h3>
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='mb-2 bg-gray-200 w-60%'></input>
                    <br></br>
                    <button type="submit" className='flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-lg mt-5' >Sign up</button>
                </form>
                <p>Already have an account? <a href='/captionlogin' className='text-blue-500'>Login here</a></p>
            </div >
        </>
    )
}

export default CaptionSignupPage;