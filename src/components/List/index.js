import React, { useState } from 'react'
import { Link } from "react-router-dom"
import emailjs from 'emailjs-com'
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import LanguageSelect from './../LanguageSelect/index'
import { MainContext, useContext } from './../../context';
import swal from 'sweetalert';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function Index() {
  const { invoices } = useContext(MainContext)
  const { t } = useTranslation()
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
      const filteredData = invoices.filter(invoice => invoice.payment_date !== undefined && invoice.payment_date !== "");
      setFilteredInvoices(filteredData)
    } else if (selectedFilterType === 'unpaid_invoices') {
      const filteredData = invoices.filter(invoice => invoice.payment_date === undefined || invoice.payment_date === "");
      setFilteredInvoices(filteredData)
    }
  }

  const onClickEmailButton = (invoice) => {

    emailjs.send('gmail', 'template_invoices', invoice, 'M9wIkM3tvly1rDeUX')
      .then((result) => {
        toast.success(t("list.toasts.email.on_succes"), toastOptions);
      }, (error) => {
        toast.error(t("list.toasts.email.on_error"), toastOptions);
      });
  }

  const onClickDeleteButton = (invoice) => {
    swal({
      title: t("list.table.modal.title"),
      text: t("list.table.modal.text"),
      icon: "warning",
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          swal(t("list.table.modal.delete.title"), t("list.table.modal.delete.text"), "success");
        }
      });
  }

  return (
    <section className="mt-10 max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <ul className='max-w-7xl mx-auto sm:px-6 text-lg border-b-2 border-gray-300 py-6 md:justify-start md:space-x-10 text-neutral-500' href="#">
        <span className='ml-10 mr-10 text-3xl font-style: italic text-gray-900 font-sans'>INVOICE.</span>
        <Link className='mr-10 font-sans' to="/">{t("list.buttons.create_new_invoice")}</Link>
        <LanguageSelect />
      </ul>
      <h2 className="mt-10 text-3xl font-semibold text-center text-gray-800 dark:text-white font-sans">{t("list.title")}</h2>
      <p className="mt-3 mb-20 text-center text-gray-600 dark:text-gray-400 font-sans">
        <b className="font-style: italic text-gray-900 font-sans mr-1">INVOICE,</b>
        {t("list.description")}</p>
      <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
        <input
          className='mb-10 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans'
          placeholder={t("list.filters.input")}
          onChange={filterByInput}
        />
        <select className='mb-10 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans'
          onChange={filterBySelect}>
          <option value="default">{t("list.filters.select.options.default")}</option>
          <option value="paid_invocies">{t("list.filters.select.options.paid_invoices")}</option>
          <option value="unpaid_invoices">{t("list.filters.select.options.unpaid_invoices")}</option>
        </select>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 font-sans">
                {t("list.table.title")}
              </th>
              <th scope="col" className="py-3 px-6 font-sans">
                {t("list.table.recipent_name")}
              </th>
              <th scope="col" className="py-3 px-6 font-sans">
                {t("list.table.payment_date")}
              </th>
              <th scope="col" className="py-3 px-6 font-sans">
                {t("list.table.details")}
              </th>
              <th scope="col" className="py-3 px-6">
              </th>
              <th scope="col" className="py-3 px-6">
              </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredInvoices.map((invoice, i) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={i}>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                    {invoice.title}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                    {invoice.recipent}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                    {invoice.payment_date && invoice.payment_date.toLocaleDateString()}
                  </td>
                  <td><Link to={`/details/${invoice.id}`} className="p4 bg-gray-500 hover:bg-gray-600 text-white rounded-md p-2 mt-3">
                    {t("list.table.details")}
                  </Link>
                  </td>
                  <td className="py-4 px-6 font-medium font-light text-gray-900 whitespace-nowrap dark:text-white">
                    <button className="bg-transparent hover:bg-blue-100 text-blue-800 hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded font-sans"
                      position="top-right"
                      onClick={() => {
                        onClickEmailButton(invoice)
                      }}>{t("list.buttons.send_email")}</button></td>
                  <td className="py-4 px-6 font-medium font-light text-gray-900 whitespace-nowrap dark:text-white">
                    <button className="bg-transparent hover:bg-blue-100 text-blue-800 hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded font-sans"
                      onClick={() => {
                        onClickDeleteButton(invoice)
                      }}> {t("list.table.delete")}</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </section>
  )
}

export default Index
