import React, { useState } from 'react'
import { Link } from "react-router-dom"

function Index({ invoices }) {
  const [filteredInvoices, setFilteredInvoices] = useState(invoices)

  const filterByInput = (e) => {
    const searchedWords = e.target.value

    const filteredData = invoices.filter(invoice => invoice.title.toLowerCase().includes(searchedWords.toLocaleLowerCase()) || invoice.description.toLowerCase().includes(searchedWords.toLocaleLowerCase()))

    setFilteredInvoices(filteredData)
  }

  return (
    <div>
      <div className="flex border-b">
        <ul className='-mb-px mr-1'>
          <li className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-pink-700 font-semibold' href="#">
            <Link to="/">Yeni fatura oluştur</Link>
          </li>
        </ul>
      </div>
      <div>

        <input
          className='mt-5 mr-10'
          placeholder='Filter invoices'
          onChange={filterByInput}
        />

        {
          filteredInvoices.length > 0 &&
          <ul className='list'>
            {
              filteredInvoices.map((invoice, i) => (
                <li key={i}>
                  <span>{invoice.items.service}</span>
                  <span>{invoice.items.quantity}</span>
                  <span>{invoice.title}</span>
                  <span>{invoice.description}</span>
                  <span>{invoice.receiver_email}</span>
                  <span>{invoice.credit_card}</span>
                  <span>{invoice.payment_date}</span>
                </li>
              ))}
          </ul>
        }
        {
          filteredInvoices.length === 0 && <div>Herhangi bir veri bulunamadı.</div>
        }
        <p>Total invoice({filteredInvoices.length})</p>
      </div>
    </div>
  )
}

export default Index
