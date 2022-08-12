import React from 'react'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

function Index() {
  const { t } = useTranslation()
  const onChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <select defaultValue={i18n.language}
      className='float-right bg-transparent py-1 px-1 border border-gray-100 hover:border-transparent rounded'
      onChange={onChangeLanguage}>
      <option value="en">{t("language_select.options.en")}</option>
      <option value="tr">{t("language_select.options.tr")}</option>
    </select>
  )
}

export default Index
