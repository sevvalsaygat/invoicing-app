import React from 'react'
import { Link } from "react-router-dom"
import { useForm, useFieldArray } from "react-hook-form";

const defaultItemValue = {
  service: '',
  quantity: '0',
  price: '0'
}

function Index({ invoices, setInvoices }) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      items: [defaultItemValue]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    setInvoices([...invoices, data])
    reset()
  };

  return (
    // <div style={{width:600, height:600, backgroundColor:"pink", justifyContent:'center', display:'flex', alignItems:'center'}}>
    //   <div style={{width:400, height:400, backgroundColor:"red" }}>
    //   <input
    //         className=" block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
    //         type="text"
    //         placeholder='Invoice Title'
    //         {...register("title", { required: true })}
    //       />
    //       <input
    //         className=" block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
    //         type="text"
    //         placeholder='Invoice Title'
    //         {...register("title", { required: true })}
    //       />
    //   </div>  
    // </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-neutral-50'>
        <ul className='max-w-7xl mx-auto sm:px-6 text-lg border-b-2 border-gray-300 py-6 md:justify-start md:space-x-10 text-neutral-500 font-Times New Roman' href="#">
          <span className='ml-10 mr-10 text-3xl font-style: italic text-gray-900'>INVOICE.</span>
          <Link className='ml-10' to="/list">Fatura Listele</Link>
        </ul>
          <label>Title</label>
          <input
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="text"
            placeholder='Invoice Title'
            {...register("title", { required: true })}
          />
          {errors.title && <span className='text-red-500'>This field is required!</span>}
          <label>Description</label>
          <textarea
            rows={5}
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            placeholder='Description'
            {...register("description")}
          />
          <label>Recipient Name</label>
          <input
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="text"
            placeholder='Recipient Name'
            {...register("recipent", { required: true })}
          />
          {errors.title && <span className='text-red-500'>This field is required!</span>}
          <label>Receiver e-mail</label>
          <input
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="email"
            placeholder='Receiver e-mail'
            {...register("receiver_email", { required: true })}
          />
          {errors.receiver_email && <span className='text-red-500'>This field is required!</span>}
          <label>Payment Type</label>
          <select
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            {...register("payment_type", { required: true })}>
            <option value="">Please select payment type</option>
            <option value="credit_card">Credit Card</option>
            <option value="check">Check</option>
            <option value="cash">Cash</option>
          </select>
          {errors.payment_type && <span className='text-red-500'>This field is required!</span>}
          <label>Payment Date</label>
          <input
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="date"
            placeholder='Payment Date'
            {...register("payment_date", { required: false })}
          />
          <label>Payment Due Date</label>
          <input
            className="text-gray-700 dark:text-gray-200 block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="date"
            placeholder='Payment Due Date'
            {...register("payment_due_date", { required: true })}
          />
          {errors.payment_due_date && <span className='text-red-500'>This field is required!</span>}
          <table>
            <tbody>
              <tr>
                <th>Service</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th></th>
              </tr>
              {
                fields.map((field, i) => (
                  <tr key={i}>
                    <td>
                      <input className='mt-5 py-1 px-4'
                        placeholder='Service'
                        {...register(`items[${i}].service`, { required: true })}
                      />
                    </td>
                    <td>
                      <input className='mt-5 py-1 px-4'
                        placeholder='Quantity'
                        {...register(`items[${i}].quantity`, {
                          required: true,
                          valueAsNumber: true,
                          validate: (value) => value > 0,
                        })}
                      />
                    </td>
                    <td>
                      <input className='mt-5 py-1 px-4'
                        placeholder='Price'
                        {...register(`items[${i}].price`, {
                          required: true,
                          valueAsNumber: true,
                          pattern: {
                            value: /^(0|[1-9]\d*)(\.\d+)?$/
                          },
                        })}
                      />
                    </td>
                    <td>
                      {
                        field.quantity && field.price && field.quantity * field.price
                      }
                    </td>
                    <td>
                      <button className="ml-10 bg-transparent hover:bg-blue-100 text-blue-800 font-Times New Roman hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                        type='submit'
                        onClick={() => {
                          remove(i)
                        }}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button className="mr-10 mt-10 bg-transparent hover:bg-blue-100 text-blue-800 font-Times New Roman hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            type='submit'
            onClick={() => {
              append(defaultItemValue)
            }}>Add New Item</button>

          <button
            className="bg-transparent hover:bg-blue-100 text-blue-800 font-Times New Roman hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            type='submit'>
            Create
          </button>
        </div>
    </form>
  )
}

export default Index
