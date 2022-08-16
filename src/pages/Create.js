import React from 'react'
import Form from '../components/Form/index'

function Create({ invoices, setInvoices }) {

  return (
    <div>
      <Form invoices={invoices} setInvoices={setInvoices} />
    </div>
  )
}

export default Create