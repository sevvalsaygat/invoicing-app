import React from 'react'
import { Link } from "react-router-dom"
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import LanguageSelect from './../LanguageSelect/index'

const defaultItemValue = {
  service: '',
  quantity: '0',
  price: '0'
}

function Index({ invoices, setInvoices }) {
  const { t } = useTranslation()
  const { register, watch, handleSubmit, control, reset, formState: { errors } } = useForm({
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

  const watchPaymentDate = watch("payment_date");
  const watchPaymentDueDate = watch("payment_due_date");

  return (
    <section onSubmit={handleSubmit(onSubmit)} className="mt-10 max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <ul className='max-w-7xl mx-auto sm:px-6 text-lg border-b-2 border-gray-300 py-6 md:justify-start md:space-x-10 text-neutral-500' href="#">
        <span className='ml-10 mr-10 text-3xl font-style: italic text-gray-900 font-sans'>INVOICE.</span>
        <Link className='mr-10 font-sans' to="/list">{t("form.buttons.list_invoices")}</Link>
        <LanguageSelect />
      </ul>
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">...</h2>
      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200">{t("form.fields.title")}</label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans"
              type="text"
              placeholder={t("form.fields.title")}
              {...register("title", { required: true })}
            />
            {errors.title && <span className='text-red-500'>{t("form.errors.required")}</span>}
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200">{t("form.fields.description")}</label>
            <textarea
              rows={5}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans"
              placeholder={t("form.fields.description")}
              {...register("description")}
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200">{t("form.fields.recipent_name")}</label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans"
              type="text"
              placeholder={t("form.fields.recipent_name")}
              {...register("recipent", { required: true })}
            />
            {errors.title && <span className='text-red-500'>{t("form.errors.required")}</span>}
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200">{t("form.fields.reciver_email")}</label>
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans"
              type="email"
              placeholder={t("form.fields.reciver_email")}
              {...register("receiver_email", { required: true })}
            />
            {errors.receiver_email && <span className='text-red-500'>{t("form.errors.required")}</span>}
          </div>
          {
            !watchPaymentDueDate && (
              <div>
                <label className="text-gray-700 dark:text-gray-200">{t("form.fields.payment_date")}</label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans"
                  type="date"
                  {...register("payment_date", { required: false })} />
              </div>
            )
          }
          {
            !watchPaymentDate && (
              <div>
                <label className="text-gray-700 dark:text-gray-200">{t("form.fields.payment_due_date")}</label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans"
                  type="date"
                  {...register("payment_due_date", { required: false })}
                />
              </div>
            )
          }
          <div>
            <label className="text-gray-700 dark:text-gray-200">{t("form.fields.payment_type.label")}</label>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans"
              {...register("payment_type", { required: true })}>
              <option value="">{t("form.fields.payment_type.options.default")}</option>
              <option value="credit_card">{t("form.fields.payment_type.options.credit_card")}</option>
              <option value="check">{t("form.fields.payment_type.options.check")}</option>
              <option value="cash">{t("form.fields.payment_type.options.cash")}</option>
            </select>
            {errors.payment_type && <span className='text-red-500'>{t("form.errors.required")}</span>}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sans">
                        {t("form.fields.items.service")}
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sans">
                        {t("form.fields.items.quantity")}
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sans">
                        {t("form.fields.items.price")}
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sans">
                        {t("form.fields.items.total_price")}
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left font-sans">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      fields.map((field, i) => (
                        <tr key={i} className="border-b">
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-sans'>
                            <input className='mt-5 py-1 px-4 w-30 bg-white border border-gray-300 rounded-md'
                              placeholder={t("form.fields.items.service")}
                              {...register(`items[${i}].service`, { required: true })}
                            />
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-sans'>
                            <input className='mt-5 py-1 px-4 w-16 border border-gray-300 rounded-md'
                              placeholder={t("form.fields.items.quantity")}
                              {...register(`items[${i}].quantity`, {
                                required: true,
                                valueAsNumber: true,
                                validate: (value) => value > 0,
                              })}
                            />
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-sans'>
                            <input className='mt-5 py-1 px-4 w-16 border border-gray-300 rounded-md'
                              placeholder={t("form.fields.items.price")}
                              {...register(`items[${i}].price`, {
                                required: true,
                                valueAsNumber: true,
                                pattern: {
                                  value: /^(0|[1-9]\d*)(\.\d+)?$/
                                },
                              })}
                            />
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-sans'>
                            <p className='mt-5 py-1 px-4 w-16 border border-gray-300 rounded-md'>{
                              field.quantity && field.price && field.quantity * field.price
                            }</p>
                          </td>
                          <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap font-sans'>
                            <button className="mt-5 bg-transparent hover:bg-blue-100 text-blue-800 font-Times New Roman hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                              type='submit'
                              onClick={() => {
                                remove(i)
                              }}>{t("form.buttons.delete")}</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button className="mr-10 mt-10 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-sans"
          type='submit'
          onClick={() => {
            append(defaultItemValue)
          }}>{t("form.buttons.add_new_item")}</button>
        <button
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-sans"
          type='submit'>
          {t("form.buttons.create")}
        </button>
      </form>
    </section>
  )
}

export default Index
