import React, { useState } from 'react'
import Form from '../components/Form/index'
import ItemForm from '../components/Form/ItemForm'

const initialFormValues = {
  title: "",
  description: "",
  receiver_email: "",
  payment_date: "",
  payment_due_date: "",
  items: []
}

function Home({invoices, setInvoices}) {
  const [invoiceForm, setInvoiceForm] = useState(initialFormValues)

  return (
    <div>
      <Form invoiceForm={invoiceForm} setInvoiceForm={setInvoiceForm} invoices={invoices} setInvoices={setInvoices}/>
      <ItemForm invoiceForm={invoiceForm} setInvoiceForm={setInvoiceForm}/>
    </div>
  )
}

export default Home