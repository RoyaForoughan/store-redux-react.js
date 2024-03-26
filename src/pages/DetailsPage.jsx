import { useProductDetails } from "../context/ProductContext"
import {useDispatch , useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
 import Loader from '../components/Loader'
 import { SiOpenproject } from "react-icons/si";
 import { IoMdPricetags } from "react-icons/io";
 import { FaArrowLeft } from "react-icons/fa";
 import styles from './DetailsPage.module.css'
import { useEffect } from "react";
import { fetchProducts } from "../features/product/productSlice";
function DetailsPage() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const productDetails = useSelector(store => store.product.products.find(i => i.id === +id))
  
  useEffect(() => {
    dispatch(fetchProducts)
  } , [])

  if(!productDetails) return <Loader/>
  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
      <h3 className={styles.title}>{productDetails.title}</h3>
      <p className={styles.description}>{productDetails.description}</p>
      <SiOpenproject />
      <p className={styles.category}>{productDetails.category}</p>
      <div>
        <span className={styles.price}>
      <IoMdPricetags />
          {productDetails.price}
        </span>
        <Link to='/products'>
      <FaArrowLeft />
          <span>Back to shop</span>
          </Link>
      </div>
      </div>
    </div>
  )
}

export default DetailsPage