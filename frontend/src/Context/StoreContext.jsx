import { createContext, useEffect, useState} from 'react';
import axios from "axios" ;
export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    // const url = "http://localhost:4004";
    const url = "https://order-food-3i29.onrender.com";
    const[food_list, setFoodList] = useState([]);
    const [token,setToken] = useState("");
    
 
    const addToCart = async (itemId) => {
        if (!token) {
            alert("Please Login to Order the Food !");
            return;
          }
        if(!cartItems[itemId]){
            setCartItems((prev)=> ({...prev, [itemId]:1}));
        }
        else{
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}));
        }
        // setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if(token){
            await axios.post(url + "/api/cart/add" , {itemId} , {headers: {token}});
        }

        console.log(cartItems)
    };

    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url + "/api/cart/remove" , {itemId} , {headers: {token}});
        };
        
    };

    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            let itemInfo = food_list.find((product) => product._id === item);
            
            if(cartItems[item] > 0){
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;

    }

    const fetchFoodList = async() => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }
    
    const loadCartData = async(token) => {
        const response = await axios.post(url + "/api/cart/get" , {}, {headers: {token}});
        setCartItems(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                const token = localStorage.getItem("token");
                setToken(token);
                await loadCartData(token);
            }
        }
        loadData();
    },[])

    const contextvalue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

