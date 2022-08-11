import React from 'react'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

function Index() {
  const { t } = useTranslation()
  const onChangeLanguage= (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <select className='mb-10 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring font-sans'
      onChange={onChangeLanguage}>
      <option value="en">{t("language_select.options.en")}</option>
      <option value="tr">{t("language_select.options.tr")}</option>
    </select>
  )
}

export default Index
