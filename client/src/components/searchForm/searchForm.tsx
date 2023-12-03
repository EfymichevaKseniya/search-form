import React, { ChangeEvent, FormEvent, useState } from "react";
import { useMask } from "@react-input/mask";
import './searchForm.css'
import ResultBlock from "../resultBlock/resultBlock";
import { request } from "../../helpers/request";

export type User = {
  email: string
  number?: string
}

const SearchForm: React.FC = () => {
  const inputRef = useMask({ mask: '__-__-__', replacement: '_', showMask: true, separate: true })
  const [values, setValues] = useState<User>({
    email: '',
    number: '__-__-__'
  })

  const [searchResult, setSearchResult] = useState<User[] | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeInput = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setValues({ ...values, [target.name]: target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setError('')
    setSearchResult(null)

    try {
      setLoading(true)
      const res = await request('search', 'POST', { ...values, ...{ 'number': values.number?.split('-').join('').replace(/_/g, '') }})
      const result = await res.json()

      if (res.status !== 200) {
        throw new Error((result.error))
      }

      setSearchResult(result)
      setLoading(false)

    } catch (error) {
      setError((error as Error).message)
      setLoading(false)
    }
  }

  return (
    <div className="search__page-wrapper">
      <form
        className="form"
      >
        <label className="form__label">
          Email
            <input
              type="email"
              name='email'
              className="form__input"
              value={values.email}
              onChange={handleChangeInput}
            />
          </label>
        <label className="form__label">
          Number
          <input
            ref={inputRef}
            className="form__input"
            name="number"
            value={values.number}
            onChange={handleChangeInput}
          />
        </label>
        <button
          className="form__btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <div className="search__block">
        <ResultBlock
          data={searchResult}
          loading={loading}
          errorMessage={error}
        />
      </div>
    </div>

  )
}

export default SearchForm
