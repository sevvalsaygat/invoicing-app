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
    <div>
      <div className="flex border-b">
        <ul className='-mb-px mr-1'>
          <li className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-pink-700 font-semibold' href="#">
            <Link to="/list">Fatura Listele</Link>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-10'>
          <label className="text-gray-700 dark:text-gray-200" >Title</label>
          <input
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="text"
            placeholder='Invoice Title'
            {...register("title", { required: true })}
          />
          {errors.title && <span className='text-red-500'>This field is required!</span>}
        </div>
        <div className='mt-5'>
          <label className="text-gray-700 dark:text-gray-200" >Description</label>
          <textarea
            rows={5}
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            placeholder='Description'
            {...register("description")}
          />
        </div>
        <div className='mt-5'>
          <label className="text-gray-700 dark:text-gray-200" >Receiver e-mail</label>
          <input
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="email"
            placeholder='Receiver e-mail'
            {...register("receiver_email", { required: true })}
          />
          {errors.receiver_email && <span className='text-red-500'>This field is required!</span>}
        </div>
        <div className='mt-5'>
          <label className="text-gray-700 dark:text-gray-200" >Payment Type</label>
          <select
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            {...register("payment_type", { required: true })}>
            <option value="">Please select payment type</option>
            <option value="credit_card">Credit Card</option>
            <option value="check">Check</option>
            <option value="cash">Cash</option>
          </select>
          {errors.payment_type && <span className='text-red-500'>This field is required!</span>}
        </div>
        <div className='mt-5'>
          <label className="text-gray-700 dark:text-gray-200" >Payment Date</label>
          <input
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="date"
            placeholder='Payment Date'
          />
        </div>
        <div className='mt-5'>
          <label className="text-gray-700 dark:text-gray-200" >Payment Due Date</label>
          <input
            className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            type="date"
            placeholder='Payment Due Date'
            {...register("payment_due_date", { required: true })}
          />
          {errors.payment_due_date && <span className='text-red-500'>This field is required!</span>}
        </div>
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
                    <input
                      placeholder='Service'
                      {...register(`items[${i}].service`, { required: true })}
                    />
                  </td>
                  <td>
                    <input
                      placeholder='Quantity'
                      {...register(`items[${i}].quantity`, {
                        required: true,
                        valueAsNumber: true,
                        validate: (value) => value > 0,
                      })}
                    />
                  </td>
                  <td>
                    <input
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
                    <button className="mt-5 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
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
        <button className="mt-5 mr-5 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          type='submit'
          onClick={() => {
            append(defaultItemValue)
          }}>Add New Item</button>

        <button
          className="mt-5 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          type='submit'>
          Create
        </button>
      </form>
      <br />
    </div>
  )
}

export default Index
