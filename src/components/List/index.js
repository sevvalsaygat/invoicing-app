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
    <div className='bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='text-lg flex justify-between items-center border-b-2 border-gray-300 py-6 md:justify-start md:space-x-10 text-neutral-500 font-Times New Roman'>
          <ul href="#">
            <Link className='ml-10' to="/">Yeni fatura oluştur</Link>
          </ul>
        </div>
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
              <th>Recipent Name</th>
              <th>Payment Date</th>
              <th>Detaylar</th>
            </tr>
            {
              filteredInvoices.map((invoice, i) => (
                <tr key={i}>
                  <td>{invoice.title}</td>
                  <td>{invoice.description}</td>
                  <td>{invoice.recipent}</td>
                  <td>{invoice.payment_date}</td>
                  <td><button onClick={() => {
                    setModal({ isOpened: true, invoice: invoice })
                  }}>Detaylar</button></td>
                  <td><button position="top-right"
                    onClick={() => { onClickEmailButton(invoice) }}>Send Email</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
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
                <th>Service</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
              {
                modal.invoice.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.service}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.price * item.quantity}</td>
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
  )
}

export default Index
