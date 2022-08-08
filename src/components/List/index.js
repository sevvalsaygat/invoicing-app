import React, { useState } from 'react'
import { Link } from "react-router-dom"

function Index({ invoices }) {
  const [filterText, setFilterText] = useState("")

  const filtered = invoices.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
    );
  });

  const[selectText, setSelectText] = useState("")

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
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <select onChange={(e) => setSelectText(e.target.value)}>
          <option value="">Payment Type</option>
          <option value="">Ödenmiş Faturalar</option>
          <option value="">Ödenmemiş Faturalar</option>
        </select>

        <ul className='list'>
          {
            filtered.map((invoice, i) => (
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
        <p>Total invoice({filtered.length})</p>
      </div>
    </div>
  )
}

export default Index