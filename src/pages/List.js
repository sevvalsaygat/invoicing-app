import React from 'react'
import List from '../components/List/index'

function List({ invoices }) {

  return (
    <div>
      <List invoices={invoices} />
    </div>
  )
}

export default List