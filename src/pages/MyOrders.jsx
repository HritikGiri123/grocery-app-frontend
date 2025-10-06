// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'
// import { dummyAddress, dummyOrders } from '../assets/greencart_assets/assets'

// const MyOrders = () => {
//     const[myOrders,setMyOrders]=useState([])
//     const {currency}=useAppContext()

//     const fetchMyOrders= async()=>{
//         setMyOrders(dummyOrders)
//     }
//     useEffect(()=>{

//         fetchMyOrders();
//     },[])

//   return (
    
//     <div className='mt-16 pb-15'>
//         <div className='flex flex-col items-end w-max mb-8'>
//             <p className='text-2xl font-medium uppercase'>
//         My Orders
//       </p>
//         </div>
//       <div className='w-16 h-0.5 bg-primary rounded-full'>

//       </div>
//       {myOrders.map((order,index)=>(
//         <div>

//             <p>
//                 <span>
//                    <span>OrderId:{order._id}</span>
//                      <span>Payment:{order.paymentType}</span>
//                        <span>Total Amount:{currency}{order.amount}</span>
//                 </span>
//             </p>
//             {order.items.map(()=>(
//                 <div>
//                     <div>
//                         <div>
//                             <img src={items.product.image[0]}></img>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//       ))}

//     </div>
//   )
// }

// export default MyOrders


import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/greencart_assets/assets'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const { currency,axios,user } = useAppContext()

  const fetchMyOrders = async () => {
    // setMyOrders(dummyOrders)
    try{
      const{data}=await axios.get('/api/order/user')
      if(data.success){
        setMyOrders(data.orders)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyOrders()
  }, [])

  return (
    <div className="mt-16 pb-15 px-6">
      {/* Header */}
      <div className="flex flex-col items-start mb-8">
        <p className="text-2xl font-bold uppercase tracking-wide">MY ORDERS</p>
        <div className="w-24 h-0.5 bg-primary rounded-full mt-2"></div>
      </div>

      {myOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 mb-6 bg-white shadow-sm"
          >
            {/* Order Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between mb-4 text-sm sm:text-base font-medium">
              <span>Order ID: <span className="text-gray-700">{order._id}</span></span>
              <span>Payment: <span className="text-gray-700">{order.paymentType}</span></span>
              <span>
                Total Amount:{" "}
                <span className="text-gray-900">
                  {currency}
                  {order.amount}
                </span>
              </span>
            </div>

            {/* Items inside order */}
            <div className="divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-6"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain"
                  />

                  {/* Product Info */}
                  <div className="flex-1 text-primary text-base font-medium">
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Category: {item.product.category}
                    </p>
                  </div>

                  {/* Order Details */}
                  <div className=" flex flex-col justify-center md:ml-8 mb-4 md:mb-0 ">
                    <p>Qty: {item.quantity || "1"}</p>
                    <p>Status: {order.status}</p>
                    <p>
                      Price: {currency}
                      {item.product.offerPrice}
                    </p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Amount */}
                  <p className="text-primary font-semibold text-lg">
                    Amount: {currency}
                    {item.product.offerPrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MyOrders
