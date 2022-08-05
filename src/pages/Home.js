import React from 'react'
import Form from '../components/Form/index'

function Home({ invoices, setInvoices }) {

  return (
    <div>
      <Form invoices={invoices} setInvoices={setInvoices} />
    </div>
  )
}

export default Home