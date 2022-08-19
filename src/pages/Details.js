import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MainContext, useContext } from './../context';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../components/LanguageSelect/index'


function Details() {
  const { id } = useParams();
  const { t } = useTranslation()
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
      <h1>{t("details.error.error_message")}</h1>
    )
  }

  return (
    <section className="mt-10 max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <ul className='max-w-7xl mx-auto sm:px-6 text-lg border-b-2 border-gray-300 py-6 md:justify-start md:space-x-10 text-neutral-500' href="#">
        <span className='ml-10 mr-10 text-3xl font-style: italic text-gray-900 font-sans'>INVOICE.</span>
        <LanguageSelect />
      </ul>
      <div className="flex justify-around mt-5">
        <div className='mt-10 h-40 w-100 py-4 bg-white shadow-md rounded-lg dark:bg-gray-800'>
          <div className=" px-6 font-medium text-gray-900 dark:text-white font-sans">
            <span className='ml-5 mr-5 border border-gray-100 rounded-md px-2 py-1 text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 font-sans'>{t("details.fields.title")}:</span>
            {currentInvoice.title}
          </div>
          <div className="mt-2 px-6 font-medium text-gray-900 dark:text-white font-sans">
            <span className='ml-5 mr-5 border border-gray-100 rounded-md px-2 py-1 text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 font-sans'>{t("details.fields.recipent_name")}:</span>
            {currentInvoice.recipent}
          </div>
          <div className="mt-2 px-6 font-medium text-gray-900 dark:text-white font-sans">
            <span className='ml-5 mr-5 border border-gray-100 rounded-md px-2 py-1 text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 font-sans'>{t("details.fields.receiver_email")}:</span>
            {currentInvoice.receiver_email}
          </div>
          <div className="mt-2 px-6 font-medium text-gray-900 dark:text-white font-sans">
            <span className='ml-5 mr-5 border border-gray-100 rounded-md px-2 py-1 text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 font-sans'>{t("details.fields.payment_type")}:</span>
            {currentInvoice.payment_type}
          </div>
        </div>
        <div className="mt-10 mb-20 h-40 w-100 max-w-xl max-h-60 overflow-auto px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="mt-2">
              <a href="#" className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{t("details.quantity.title")}</a>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{currentInvoice.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='float-right mb-10'>
        <div className="mt-20 px-6 font-medium text-gray-900 dark:text-white font-sans">
          <span className='ml-5 mr-5 underline text-gray-900 font-sans'>{t("details.fields.payment_date")}:</span>
          {currentInvoice.payment_date && currentInvoice.payment_date.toLocaleDateString()}
        </div>
        <div className="mt-2 px-6 font-medium text-gray-900 dark:text-white font-sans">
          <span className='ml-5 mr-5 underline text-gray-900 font-sans'>{t("details.fields.payment_due_date")}:</span>
          {currentInvoice.payment_due_date && currentInvoice.payment_due_date.toLocaleDateString()}
        </div>
      </div>
      <div>
        <table className="w-full mb-20 text-sm text-left uppercase text-gray-500 dark:text-gray-400">
          <tbody className="text-xs text-gray-700 bg-gray-100 shadow-md sm:rounded-lg dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 font-sans">{t("details.table.service")}</th>
              <th scope="col" className="py-3 px-6 font-sans">{t("details.table.quantity")}</th>
              <th scope="col" className="py-3 px-6 font-sans">{t("details.table.price")}</th>
              <th scope="col" className="py-3 px-6 font-sans">{t("details.table.total")}</th>
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
