// import { children,createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/greencart_assets/assets";
// import toast from "react-hot-toast";
// import axios from 'axios';

// //fetch seller status

// const fetchSeller=async ()=>{
//   try{
// const {data}=await axios.get('/api/seller/is-auth')
// if(data.success){
//   setIsSeller(true)
// }
// else{

//   setIsSeller(false)
// }
//   }catch(error){

//  setIsSeller(false)
//   }
// }

// //for backend
// axios.defaults.withCredentials=true;
// axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
  
//   const currency=import.meta.env.VITE_CURRENCY;
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null); // user info
//   const [isSeller, setIsSeller] = useState(false);
//   const [cart, setCart] = useState([]); 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const [products, setProducts] = useState([]);

//   const [cartItems ,setcartItems]=useState({})
  

//   //fetch all products
//   const fetchproducts=async()=>{
//     setProducts(dummyProducts)
//   }
//   useEffect(()=>{
//     fetchSeller()
//     fetchproducts()
//   },[])

// //add products to cart
// const addToCart=(itemId)=>{
//   let cartData=structuredClone(cartItems);
//   if(cartData[itemId]){
//     cartData[itemId]+=1;
//   }
//   else{
//     cartData[itemId] =1;
//   }
//   setcartItems(cartData);
//   toast.success("added to cart")
// };
// //update cart item quality

//  const updateCartItem = (itemId, quantity) => {
//     let cartData = structuredClone(cartItems);
//     cartData[itemId] = quantity;
//     setcartItems(cartData);
//     toast.success("Cart updated");
//   };
// //remove product from cart

// const removeFromCart = (itemId) => {
//   let cartData = structuredClone(cartItems);
//   if (cartData[itemId]) {
//     cartData[itemId] -= 1;
//     if (cartData[itemId] === 0) {
//       delete cartData[itemId];
//     }
//   }
//   setcartItems(cartData);
//   toast.success("Removed from cart");
// };

// //get cart item count

//   const getCartCount = () => {
//   // return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

//   let totalCount=0;
//   for(const item in cartItems){
//     totalCount+=cartItems[item];
//   }
//   return totalCount;
// };

// //get cart total amount
// // const getCartAmount=()=>{
// //   let totalAmount=0;
// //   for(const items in cartItems){
// //     let itemInfo=products.find((product)=>product._id===items);
// //     if(cartItems[item]>0){
// //       totalAmount+=itemInfo.offerPrice * cartItems[items]
// //     }
// //   }
// //   return Math.floor(totalAmount * 100)/100;
// // }

// const getCartAmount = () => {
//   let totalAmount = 0;

//   for (const items in cartItems) {
//     if (cartItems[items] > 0) {
//       let itemInfo = products.find((product) => product._id === items);
//       if (itemInfo) {
//         totalAmount += itemInfo.offerPrice * cartItems[items];
//       }
//     }
//   }

//   return Math.floor(totalAmount * 100) / 100;
// };


//   // const logout = () => {
//   //   setUser(null);
//   //   alert("Logged out ✅");
//   // };
// const logout = () => {
//   setUser(null); // clear state
//   localStorage.removeItem("user"); // if you’re exististing user
//   navigate("/");
// };

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     cart,
//     setCart,
//     getCartCount,
//     searchQuery,
//     setSearchQuery,
//     showUserLogin,
//     setShowUserLogin,
//     currency,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     cartItems,
//     setcartItems,
//       products, 
//        setProducts,
//        getCartAmount,
//        axios
    
//   };

//   return (
//     <AppContext.Provider value={value}>{children}</AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };


import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// for backend
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // user info
  const [isSeller, setIsSeller] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setcartItems] = useState({});

  // ✅ fetch seller status (now inside, can access setIsSeller)
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch (error) {
      setIsSeller(false);
    }
  };

  //fetch user auth status,user data and cart items
  const fetchUser=async()=>{
    try{
      const {data}=await axios.get('api/user/is-auth')
      if(data.success){
        setUser(data.user)
        setcartItems(data.user.cartItems)
      }
    }catch(error){
setUser(null)
    }
  }
  // fetch categories
const fetchCategories = async () => {
   try{
    const {data}=await axios.get('/api/product/categories')
    if(data.success){
      setProducts(data.products)
    }
    else{
      toast.error(data.message)
    }
   }catch(error){
    toast.error(error.message)
   }
  };
  // fetch all products
  const fetchProducts = async () => {
   try{
    const {data}=await axios.get('/api/product/list')
    if(data.success){
      setProducts(data.products)
    }
    else{
      toast.error(data.message)
    }
   }catch(error){
    toast.error(error.message)
   }
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
    
  }, []);

  //update database cart items
  useEffect(()=>{
const updateCart=async ()=>{
  try{
const {data}=await axios.post('/api/cart/update',{cartItems})
if(!data.success){
  toast.error(data.message)
}
  }catch(error){
toast.error(error.message)
  }
}

if(user){
  updateCart()
}

  },[cartItems])

  // add products to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setcartItems(cartData);
    toast.success("Added to cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setcartItems(cartData);
    toast.success("Cart updated");
  };

  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setcartItems(cartData);
    toast.success("Removed from cart");
  };

  // get cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInfo = products.find((product) => product._id === items);
        if (itemInfo) {
          totalAmount += itemInfo.offerPrice * cartItems[items];
        }
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const logout = () => {
    setUser(null); // clear state
    localStorage.removeItem("user"); // remove from storage
    navigate("/");
  };

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    cart,
    setCart,
    getCartCount,
    searchQuery,
    setSearchQuery,
    showUserLogin,
    setShowUserLogin,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    setcartItems,
    products,
    setProducts,
    getCartAmount,
    logout,
    axios,
    fetchProducts,
    setcartItems
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

