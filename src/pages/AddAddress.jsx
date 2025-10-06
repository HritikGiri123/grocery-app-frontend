// import React, { useState } from 'react'
// import { assets } from '../assets/greencart_assets/assets'

// const AddAddress = () => {

//     const[address,setAddress]=useState({
//         firstName:'',
//          lastName:'',
//           email:'',
//           street:'',
//            city:'',
//             state:'',
//              zipcode:'',
//             country:'',
//             phone:'',
//     })
// const handleChange=(e)=>{
//     const {name,value}=e.target;
//     setAddress((prevAddress)=>({
//         ...prevAddress,[name]:value,

//     }))
// }
//    const  onSubmitHandler=async(e)=>{
//     e.preventDefault();

//    }


//     //input  field component
//     const InputField=({type,placeholder,name,handleChange,value})=>(
//         <input type={type}
//         placeholder={placeholder}
//         onChange={handleChange}

//         name={name}
//         value={address[name]}
//         required
//          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//     )


//   return (

//       <div className='mt-16 pb-16'>
//         <p className='text-2xl md:text-3xl text-gray-500'>Add shipping<span className='font-semibold text-primary'>Address</span></p>
//         <div className='flex flex-col-reverse md:flex-row justify-between mt-16'>

//             <div className='flex-1 max-w-md'>
//                 <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
//                     <div className='grid grid-cols-2 gap-4'>
//                         <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name"/>
//                          <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name"/>
//                     </div>

//                 <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address"/>
//                 <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="street"/>

//                 <div className='grid grid-cols-2 gap-4'>
//                     <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="city"/>
//                     <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="state"/>
//                 </div>

//                 <div className='grid grid-cols-2 gap-4'>
//                     <InputField handleChange={handleChange} address={address} name="zipcode" type="text" placeholder="zipcode"/>
//                     <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="country"/>
//                 </div>

//                 <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="phone"/>

//                 <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
//                     Save address
//                 </button>
//                 </form>


//             </div>
//             <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt='Add Address'></img>

//         </div>
//       </div>

//   )
// }

// export default AddAddress





import React, { useState } from 'react'
import { assets } from '../assets/greencart_assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext()
  const [address, setAddress] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(address) // just to verify it works
    try {
      const { data } = await axios.post('/api/address/add', {
         address,
           userId: user?._id, 
       })

      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }


  }

  useEffect(() => {
    if (!user) {
      navigate('/cart')
    }
  }, [])

  // ✅ InputField component
  const InputField = ({ type, placeholder, name }) => (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}   // ✅ direct is fine
      name={name}
      value={address[name]}     // ✅ bound correctly
      required
      className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-16">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField name="firstname" type="text" placeholder="First Name" />
              <InputField name="lastname" type="text" placeholder="Last Name" />
            </div>

            <InputField name="email" type="email" placeholder="Email Address" />
            <InputField name="street" type="text" placeholder="Street" />

            <div className="grid grid-cols-2 gap-4">
              <InputField name="city" type="text" placeholder="City" />
              <InputField name="state" type="text" placeholder="State" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField name="zipcode" type="text" placeholder="Zipcode" />
              <InputField name="country" type="text" placeholder="Country" />
            </div>

            <InputField name="phone" type="text" placeholder="Phone" />

            <button
              type="submit"
              className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase"
            >
              Save address
            </button>
          </form>
        </div>

        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  )
}

export default AddAddress


