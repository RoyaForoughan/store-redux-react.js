import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import styles from './Layout.module.css'

function Layout({children}) {
   
    const state = useSelector(store => store.cart)
  return (
    <>
    <header className={styles.header}>
    <Link to="/products">My Store</Link>
    <Link to="/checkout">
    <div>
    <PiShoppingCartSimpleBold />
   {!!state.itemCounter && <span>{state.itemCounter}</span>}
    </div>
    </Link>
    </header>
    {children}
    <footer className={styles.footer}>
        Develop by me
    </footer>
    </>
  )
}

export default Layout