import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Modal from 'react-modal'
import emailjs from 'emailjs-com'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index({ invoices }) {
  const [filteredInvoices, setFilteredInvoices] = useState(invoices)
  const [modal, setModal] = useState({ isOpened: false, invoice: null })


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

  function afterOpenModal() {
  }

  function closeModal() {
    setModal({ isOpened: false, invoice: null });
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const onClickEmailButton = (invoice) => {
    console.log(invoice)
    toast.success('Email sent successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    emailjs.send('gmail', 'template_invoices', invoice, 'M9wIkM3tvly1rDeUX')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <section className="mt-10 max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <div className='mb-10 max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='text-lg flex justify-between items-center border-b-2 border-gray-300 py-6 md:justify-start md:space-x-10 text-neutral-500 font-Times New Roman'>
          <ul href="#">
            <span className='ml-10 mr-10 text-3xl font-style: italic text-gray-900 font-sans'>INVOICE.</span>
            <Link className='ml-10 font-sans' to="/">Create New Invoice</Link>
          </ul>
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white font-sans">Fast and easy invoicing</h2>
      <p className="mt-3 mb-20 text-center text-gray-600 dark:text-gray-400 font-sans">INVOICE online invoice generator makes your life easier when it comes to billing and collecting money.</p>

      <form>
        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
          <input
            className='mb-10 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans'
            placeholder='Filter Invoices'
            onChange={filterByInput}
          />
          <select className='mb-10 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans'
            onChange={filterBySelect}>
            <option value="default">Invoice Payment Status</option>
            <option value="paid_invocies">Paid Invoice</option>
            <option value="unpaid_invoices">Unpaid Invoice</option>
          </select>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 font-sans">
                  Title
                </th>
                <th scope="col" className="py-3 px-6 font-sans">
                  Description
                </th>
                <th scope="col" className="py-3 px-6 font-sans">
                  Recipent Name
                </th>
                <th scope="col" className="py-3 px-6 font-sans">
                  Payment Date
                </th>
                <th scope="col" className="py-3 px-6 font-sans">
                  Details
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only font-sans">Edit</span>
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
                      {invoice.description}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                      {invoice.recipent}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">
                      {invoice.payment_date}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <button className="px-3 py-1 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-sans" onClick={() => {
                        setModal({ isOpened: true, invoice: invoice })
                      }}>Details</button></td>
                    <td className="py-4 px-6 font-medium font-light text-gray-900 whitespace-nowrap dark:text-white">
                      <button className="bg-transparent hover:bg-blue-100 text-blue-800 hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded font-sans"
                        position="top-right"
                        onClick={() => {
                          onClickEmailButton(invoice)
                        }}>Send Email</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Modal
            isOpen={modal.isOpened}
            style={customStyles}
            onAfterOpen={afterOpenModal}
            ariaHideApp={false}
            onRequestClose={closeModal}
          >
            {modal.invoice && (
              <table className='w-full border mt-10 text-center'>
                <tbody>
                  <tr>
                    <th scope="col" className="py-3 px-6 font-sans">Service</th>
                    <th scope="col" className="py-3 px-6 font-sans">Quantity</th>
                    <th scope="col" className="py-3 px-6 font-sans">Price</th>
                    <th scope="col" className="py-3 px-6 font-sans">Total</th>
                  </tr>
                  {
                    modal.invoice.items.map((item, i) => (
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
            )}
          </Modal>
          <ToastContainer
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
        </div>
      </form>
    </section>
  )
}

export default Index
