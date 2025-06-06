import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/app-context";
import { fetchUsers } from "../api/github";
import type { IUserData } from "./list-user";
import { delay, type IErrorStatus } from "../helpers/common";
import PrimaryButton from "./primary-button";
import SnackBar from "./snack-bar";

const SearchBar = () => {
  const { keyword, setKeyword, setUserData } = useAppContext();
  const [localKeyword, setLocalKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<IErrorStatus>()

  const resetState = () => {
    setErrorStatus(undefined)
    setKeyword('')
    setUserData(undefined)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorStatus(undefined)
    setLocalKeyword(e.target.value)
  }

  const handleSearch = async (k: string) => {
    resetState()

    if (!k || k == '') {
      setErrorStatus({ error: true, message: "Username cannot be empty" })
      return
    }

    try {
      setIsLoading(true);
      await delay(1000)
      const userData = await fetchUsers(k)

      if (userData.error) {
        setKeyword('')
        setUserData([])
      } else {
        setKeyword(k)
        setUserData(userData.data as IUserData[])
      }
      setErrorStatus({ error: userData.error, message: userData.message || '' })
    } catch (error) {
      console.info(error)
      setUserData([]);
      setErrorStatus({ error: true, message: (error as Error).message })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const clearErrorStatusTimer = setTimeout(() => {
      setErrorStatus(undefined)
    }, 3000);

    return () => clearTimeout(clearErrorStatusTimer)
  }, [errorStatus?.message])

  return (
    <div className="flex flex-col gap-4 relative z-50 md:flex-row md:gap-0">
      <input
        type="text"
        value={localKeyword}
        onChange={handleChange}
        placeholder="Enter username"
        className={`p-2 w-full border-2  
          ${errorStatus?.error && !localKeyword ? "bg-red-100 border-red-500" : "bg-stone-200 border-stone-300"}`} />

      <PrimaryButton disabled={localKeyword == keyword} isLoading={isLoading} onClick={() => handleSearch(localKeyword)}>Search</PrimaryButton>
      {errorStatus?.error && <SnackBar className="-bottom-20 right-4" message={errorStatus.message} />}
    </div>
  )
}

export default SearchBar