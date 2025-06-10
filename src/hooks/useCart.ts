import {useState, useEffect, useMemo } from "react"
import { db } from "../data/db.js";
import type {CarItem, Guitar} from '../types'

/**
 * Creamos un hook custom para el manejo del carrito
 */
export const useCart = () =>{

    //creamos una funcion para que al entrar al sitio nos mire en la bbdd
      //  si tenemos algo almacenado y nos lo devuelve, 
      // caso contraro nos inicia el state
      const initialCart = () : CarItem[] => {
         const localStorageCart = localStorage.getItem('cart')
         return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
      const MAX_ELEM = 5;
      const MIN_ELEM = 1;
    
      //usamos useEffect para almacenar los datos del carrito en LS 
      //funciona siempre que el carrito cambie
      useEffect(() =>{
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
      //creamos la funcion que añade un elemento al carrito
      function  addToCart(item : Guitar){
    
        //almacenamos la posicion del elemento en el carrito
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if(itemExist >= 0){
          const updateCart = [...cart]
          if(updateCart[itemExist].quantity < 5){
            updateCart[itemExist].quantity++
            setCart(updateCart)
          }
        }else{
          const newItem : CarItem = {...item, quantity: 1}
          setCart([...cart, newItem])
        }
        
      }
    
      function increaseQuantity(id : Guitar['id']){
        const updateCart = cart.map(item =>{
          if(item.id === id && item.quantity < MAX_ELEM){
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      function decreaseQuantity(id : Guitar['id']){
        const updateCart = cart.map(item =>{
          if(item.id === id && item.quantity > MIN_ELEM){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      function removeFromCart(id : Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !=id))
      }
    
      function cleanCart(){
        setCart([])
      }

    //state derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
       
    
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }
}
