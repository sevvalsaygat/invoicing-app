import React from 'react'
import { Link } from "react-router-dom"
import ItemForm from './ItemForm'

function Index() {
  return (
    <div>
      <Link to="/list">Fatura Listele</Link>
      <ItemForm/>
    </div>
  )
}

export default Index