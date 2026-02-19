import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerCaption } from '../../captionSlice';

function CaptionSignupPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setlastname] = useState('');
    const navigate = useNavigate();

    const { isAuthenticationCaption, caption } = useSelector((state) => state.authCaption);
    const dispatch = useDispatch();

    if (isAuthenticationCaption) {
        navigate('/enterpage')
    }

    useEffect(() => {
        if (isAuthenticationCaption) {
            navigate('/enterpage');
        }
    }, [isAuthenticationCaption, navigate])



    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('car'); // Default to car

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCaptionData = {
            fullname: {
                firstname: name,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: Number(vehicleCapacity),
                vehicleType: vehicleType
            }
        };
        dispatch(registerCaption(newCaptionData));

        // Reset form
        setEmail('');
        setPassword('');
        setName('');
        setlastname('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('car');
    }

    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-center w-full bg-white'>
            <div className='flex justify-center mb-10'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
            </div>
            <h2 className='text-3xl font-bold mb-8 text-gray-800'>Register as Captain</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div>
                    <h3 className='text-lg font-semibold text-gray-700 mb-4'>Personal Information</h3>
                    <div className="flex flex-col gap-4 mb-4">
                        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='First Name' className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black' />
                        <input required type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} placeholder="Last Name" className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black' />
                    </div>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black mb-4' />
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black' />
                </div>

                <div className='border-t pt-6'>
                    <h3 className='text-lg font-semibold text-gray-700 mb-4'>Vehicle Information</h3>
                    <div className="flex flex-col gap-4">
                        <input required type="text" value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} placeholder='Vehicle Color' className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black' />
                        <input required type="text" value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} placeholder='Plate Number' className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black' />
                        <input required type="number" min="1" value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} placeholder='Capacity' className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black' />
                        <select required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className='w-full px-4 py-4 border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-black bg-white'>
                            <option value="car">Car</option>
                            <option value="motocycle">Motorcycle</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className='w-full bg-black text-white py-4 rounded font-semibold mt-4 text-lg' >Sign up</button>
            </form>
            <div className='mt-6 text-center pb-8'>
                <p className='text-gray-600 text-lg'>Already a Captain? <Link to='/captionlogin' className='text-blue-600 font-medium hover:underline'>Login here</Link></p>
            </div>
        </div>
    )
}

export default CaptionSignupPage;