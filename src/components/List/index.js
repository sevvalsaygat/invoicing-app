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
          className='mt-5'
          placeholder='Filter Contact'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <ul className='list mt-5'>
          {
            filtered.map((invoice, i) => (
              <li key={i}>
                <span>{invoice.title}</span>
                <span>{invoice.description}</span>
                <span>{invoice.receiver_email}</span>
                <span>{invoice.payment_type}</span>
                <span>{invoice.payment_date}</span>
                <span>{invoice.payment_due_date}</span>
              </li>
            ))}
        </ul>

        <p className='mt-5'>Total invoice({filtered.length})</p>
      </div>
    </div>
  )
}

export default Index