import React from 'react'
import { useForm } from "react-hook-form";

function ItemForm({invoiceForm, setInvoiceForm}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setInvoiceForm({...invoiceForm, items: [...invoiceForm.items, data]})
    reset()
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-gray-700 dark:text-gray-200" >Service</label>
          <input
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="text"
            placeholder='Service'
            {...register("service", { required: true })}
          />
          {errors.service && <span className='text-red-500'>This field is required!</span>}
        </div>
        <div className='mt-5'>
          <label className="text-gray-700 dark:text-gray-200" >Quantity</label>
          <input
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="number"
            placeholder='Quantity'
            {...register("quantity", { required: true })}
          />
          {errors.quantity && <span className='text-red-500'>This field is required!</span>}
        </div>
        <div className='mt-5'>
          <label className="text-gray-700 dark:text-gray-200" >Price</label>
          <input
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="number" min="0.00" max="10000.00" step="0.01"
            placeholder='Price'
            {...register("price", { required: true })}
          />
          {errors.price && <span className='text-red-500'>This field is required!</span>}
        </div>
        <button
          className="mt-5 mb-10 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          type='submit'>
          ADD
        </button>
      </form>
    </div>
  )
}

export default ItemForm