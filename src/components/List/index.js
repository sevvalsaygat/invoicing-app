import React from 'react'
import { Link } from "react-router-dom"

function Index({ invoices, setInvoices }) {
  return (
    <div>
      <Link to="/">Yeni fatura oluştur</Link>
    </div>
  )
}

export default Index