import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MainContext, useContext } from './../context';

function Details() {
  const { id } = useParams();
  const { invoices } = useContext(MainContext)
  const [currentInvoice, setCurrentInvoice] = useState(null)

  useEffect(() => {
    const invoice = invoices.filter(invoice => invoice.id === id)

    if (invoice.length === 1) {
      setCurrentInvoice(invoice[0])
    } else {
      setCurrentInvoice(null)
    }
  }, [])

  if (currentInvoice === null) {
    return (
      <h1>Bu id'ye ait bir fatura bulunamadı.</h1>
    )
  }

  return (
    <section className="mt-10 max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                {currentInvoice.title}
              </td>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                {currentInvoice.recipent}
              </td>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                {currentInvoice.payment_date && currentInvoice.payment_date.toLocaleDateString()}
              </td>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                {currentInvoice.description}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className='w-500 border mt-10 text-center'>
          <tbody>
            <tr>
              <th scope="col" className="py-3 px-6 font-sans">Service</th>
              <th scope="col" className="py-3 px-6 font-sans">Quantity</th>
              <th scope="col" className="py-3 px-6 font-sans">Price</th>
              <th scope="col" className="py-3 px-6 font-sans">Total</th>
            </tr>
            {
              currentInvoice.items.map((item, i) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={i}>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                    {item.service}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                    {item.price}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                    {item.price * item.quantity}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Details
