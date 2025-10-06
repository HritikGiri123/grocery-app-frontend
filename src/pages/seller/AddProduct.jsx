// import React, { useState } from 'react'
// import { assets, categories } from "../../assets/greencart_assets/assets";
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';


// const AddProduct = () => {
//     const [images, setImages] = useState([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [price, setPrice] = useState('');
//     const [offerPrice, setOfferPrice] = useState('');
//     const { axios } = useAppContext()
//     //console.log(categories);


//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
//         console.log("inside handle submit");
//         try {
//             const productdata = {
//                 name,
//                 description: description.split('/n'),
//                 category,
//                 price,
//                 offerPrice
//             }
//             console.log(productdata);

//             const formData = new FormData();
//             formData.append('productData', JSON.stringify(productdata));
//             for (let i = 0; i < images.length; i++) {
//                 formData.append('images', images[i])
//             }
//             console.log("formdata", formData)
//             const response = await axios.post('/api/product/add', formData)
//             // const response = await axios.post('/api/product/add', productdata)
//             const data = response?.data
//             if (data?.success) {
//                 toast.success(data.message);
//                 setName('');
//                 setDescription(''),
//                     setCategory(''),
//                     setPrice(''),
//                     setOfferPrice('')
//             }
//             else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//         event.preventDefault();
//     };

//     return (
//         <div className="no-scrollbar flex justify-center items-center py-10 bg-gray-50 min-h-screen">
//             <form
//                 onSubmit={onSubmitHandler}
//                 className="w-full md:max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-6"
//             >
//                 {/* Product Images */}
//                 <div>
//                     <p className="text-lg font-semibold text-gray-800">Product Image</p>
//                     <div className="flex flex-wrap items-center gap-4 mt-3">
//                         {Array(4)
//                             .fill('')
//                             .map((_, index) => (
//                                 <label
//                                     key={index}
//                                     htmlFor={`image${index}`}
//                                     className="cursor-pointer"
//                                 >
//                                     <input
//                                         accept="image/*"
//                                         type="file"
//                                         id={`image${index}`}
//                                         hidden
//                                         onChange={(e) => {
//                                             const updatedFiles = [...files];
//                                             updatedFiles[index] = e.target.files[0];
//                                             setFiles(updatedFiles);
//                                         }}
//                                     />
//                                     <img
//                                         src={
//                                             files[index]
//                                                 ? URL.createObjectURL(files[index])
//                                                 : assets.upload_area
//                                         }
//                                         alt="upload"
//                                         className="w-24 h-24 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform duration-200"
//                                     />
//                                 </label>
//                             ))}
//                     </div>
//                 </div>

//                 {/* Product Name */}
//                 <div className="flex flex-col gap-2">
//                     <label
//                         className="text-base font-medium text-gray-700"
//                         htmlFor="product-name"
//                     >
//                         Product Name
//                     </label>
//                     <input
//                         id="product-name"
//                         type="text"
//                         placeholder="Type here"
//                         className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
//                         required
//                         onChange={(e) => setName(e.target.value)}
//                         value={name}
//                     />
//                 </div>

//                 {/* Product Description */}
//                 <div className="flex flex-col gap-2">
//                     <label
//                         className="text-base font-medium text-gray-700"
//                         htmlFor="product-description"
//                     >
//                         Product Description
//                     </label>
//                     <textarea
//                         onChange={(e) => setDescription(e.target.value)}
//                         value={description}
//                         id="product-description"
//                         rows={4}
//                         className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
//                         placeholder="Type here"
//                     ></textarea>
//                 </div>

//                 {/* Category */}
//                 <div className="flex flex-col gap-2">
//                     <label
//                         className="text-base font-medium text-gray-700"
//                         htmlFor="category"
//                     >
//                         Category
//                     </label>
//                     <select
//                         onChange={(e) => setCategory(e.target.value)}
//                         value={category}
//                         id="category"
//                         className="outline-none py-2.5 px-3 rounded-lg border text-black border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
//                     >
//                         <option value="">Select Category</option>
//                         {categories.map((item, index) => (
//                             <option className="text-black" key={index} value={item.path}>
//                                 {item.path}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Prices */}
//                 <div className="flex items-center gap-6 flex-wrap">
//                     <div className="flex-1 flex flex-col gap-2">
//                         <label
//                             className="text-base font-medium text-gray-700"
//                             htmlFor="product-price"
//                         >
//                             Product Price
//                         </label>
//                         <input
//                             onChange={(e) => setPrice(e.target.value)}
//                             value={price}
//                             id="product-price"
//                             type="number"
//                             placeholder="0"
//                             className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
//                             required
//                         />
//                     </div>
//                     <div className="flex-1 flex flex-col gap-2">
//                         <label
//                             className="text-base font-medium text-gray-700"
//                             htmlFor="offer-price"
//                         >
//                             Offer Price
//                         </label>
//                         <input
//                             onChange={(e) => setOfferPrice(e.target.value)}
//                             value={offerPrice}
//                             id="offer-price"
//                             type="number"
//                             placeholder="0"
//                             className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
//                             required
//                         />
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     className="px-8 py-2.5 bg-primary hover:bg-primary/80 text-white font-medium rounded transition-colors"
//                 >
//                     ADD
//                 </button>

//             </form>
//         </div>
//     );
// };

// export default AddProduct;


import React, { useState } from 'react'
import { assets, categories } from "../../assets/greencart_assets/assets";
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const { axios } = useAppContext();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("inside handle submit");

        try {
            const productdata = {
                name,
                description: description.split("\n"), // ✅ fixed: use "\n" not "/n"
                category,
                price,
                offerPrice,
            };
            console.log("productdata:", productdata);

            const formData = new FormData();
            formData.append("productData", JSON.stringify(productdata));

            for (let i = 0; i < images.length; i++) {
                if (images[i]) {
                    formData.append("images", images[i]);
                }
            }

            // Debug FormData
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await axios.post("/api/product/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const data = response?.data;
            if (data?.success) {
                toast.success(data.message);
                setName("");
                setDescription("");
                setCategory("");
                setPrice("");
                setOfferPrice("");
                setImages([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="no-scrollbar flex justify-center items-center py-10 bg-gray-50 min-h-screen">
            <form
                onSubmit={onSubmitHandler}
                className="w-full md:max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-6"
            >
                {/* Product Images */}
                <div>
                    <p className="text-lg font-semibold text-gray-800">Product Image</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                        {Array(4)
                            .fill("")
                            .map((_, index) => (
                                <label
                                    key={index}
                                    htmlFor={`image${index}`}
                                    className="cursor-pointer"
                                >
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id={`image${index}`}
                                        hidden
                                        onChange={(e) => {
                                            const updatedImages = [...images];
                                            updatedImages[index] = e.target.files[0];
                                            setImages(updatedImages);
                                        }}
                                    />
                                    <img
                                        src={
                                            images[index]
                                                ? URL.createObjectURL(images[index])
                                                : assets.upload_area
                                        }
                                        alt="upload"
                                        className="w-24 h-24 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform duration-200"
                                    />
                                </label>
                            ))}
                    </div>
                </div>

                {/* Product Name */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-medium text-gray-700"
                        htmlFor="product-name"
                    >
                        Product Name
                    </label>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="Type here"
                        className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                {/* Product Description */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-medium text-gray-700"
                        htmlFor="product-description"
                    >
                        Product Description
                    </label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="product-description"
                        rows={4}
                        className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        placeholder="Type here"
                    ></textarea>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-base font-medium text-gray-700"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        id="category"
                        className="outline-none py-2.5 px-3 rounded-lg border text-black border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                    >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option className="text-black" key={index} value={item.path}>
                                {item.path}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Prices */}
                <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex-1 flex flex-col gap-2">
                        <label
                            className="text-base font-medium text-gray-700"
                            htmlFor="product-price"
                        >
                            Product Price
                        </label>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <label
                            className="text-base font-medium text-gray-700"
                            htmlFor="offer-price"
                        >
                            Offer Price
                        </label>
                        <input
                            onChange={(e) => setOfferPrice(e.target.value)}
                            value={offerPrice}
                            id="offer-price"
                            type="number"
                            placeholder="0"
                            className="outline-none py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className="px-8 py-2.5 bg-primary hover:bg-primary/80 text-white font-medium rounded transition-colors"
                >
                    ADD
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
