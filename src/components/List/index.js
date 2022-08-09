import React, { useState } from 'react'
import { Link } from "react-router-dom"

function Index({ invoices }) {
  const [filteredInvoices, setFilteredInvoices] = useState(invoices)

  const filterByInput = (e) => {
    const searchedWords = e.target.value

    const filteredData = invoices.filter(invoice => invoice.title.toLowerCase().includes(searchedWords.toLocaleLowerCase()) || invoice.description.toLowerCase().includes(searchedWords.toLocaleLowerCase()))

    setFilteredInvoices(filteredData)
  }

  const filterBySelect = (e) => {
    const selectedFilterType = e.target.value;

    if (selectedFilterType === 'default') {
      setFilteredInvoices(invoices)
    } else if (selectedFilterType === 'paid_invocies') {
      const filteredData = invoices.filter(invoice => invoice.payment_date !== null && invoice.payment_date !== "");
      setFilteredInvoices(filteredData)
    } else if (selectedFilterType === 'unpaid_invoices') {
      const filteredData = invoices.filter(invoice => invoice.payment_date === null || invoice.payment_date === "");
      setFilteredInvoices(filteredData)
    }
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
          className='mt-5 mb-5 mr-10'
          placeholder='Filter invoices'
          onChange={filterByInput}
        />

        <select onChange={filterBySelect}>
          <option value="default">Filtreleri Kaldır</option>
          <option value="paid_invocies">Ödenmiş Faturalar</option>
          <option value="unpaid_invoices">Ödenmemiş Faturalar</option>
        </select>

        <table className='w-full border mt-10 text-center'>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Payment Date</th>
              <th>Detaylar</th>
            </tr>
            {
              filteredInvoices.map((invoice, i) => (
                <tr key={i}>
                  <td>{invoice.title}</td>
                  <td>{invoice.description}</td>
                  <td>{invoice.payment_date}</td>
                  <td><button>Detaylar</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Index
