import { useState } from "react"
import ChevronDown from "../assets/icons/chevron-down"
import { useAppContext } from "../context/app-context"
import ListRepository, { type IRepositoryData } from "./list-repository"
import { fetchUserRepos } from "../api/github"
import { delay, type IErrorStatus } from "../helpers/common"
import LoadingSpinner from "../assets/icons/loading-spinner"
import SnackBar from "./snack-bar"

export interface IUserData {
  username: string
}

interface IProps {
  users?: IUserData[]
}

const ListUser = ({ users }: IProps) => {
  const { keyword, repositoryData, setRepositoryData } = useAppContext()

  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [showRepoIdx, setShowRepoIdx] = useState<number | null>(null)
  const [errorStatus, setErrorStatus] = useState<IErrorStatus>()
  const [isLoading, setIsLoading] = useState(false)

  const resetState = () => {
    setSelectedUser(null)
    setShowRepoIdx(null)
    setRepositoryData(undefined)
  }

  const handleSelectUser = async (username: string, idx: number) => {
    if (selectedUser === username) {
      resetState()
      return
    }

    resetState()

    try {
      setIsLoading(true)
      setShowRepoIdx(idx)

      await delay(1000)
      const repoData = await fetchUserRepos(username, 100)

      if (repoData.error) {
        resetState()
      } else {
        setSelectedUser(username)
        setRepositoryData(repoData.data as IRepositoryData[])
      }

      setErrorStatus({ error: repoData.error, message: repoData.message || '' })
    } catch (error) {
      console.info((error as Error).message)
      resetState()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-4">
      {!!keyword && users?.length == 0 && (<p className="pb-4 text-gray-600">{`Username "${keyword}" not found`}</p>)}
      {!!keyword && !!users && users.length > 0 && (<p className="pb-4 text-gray-600">{`Showing users for "${keyword}"`}</p>)}
      {!!users && users.length > 0 && (
        <div className="flex flex-col gap-3 relative">
          {users.map((item, idx) => {
            const isOpen = showRepoIdx === idx

            return (
              <div key={`list-user-${item.username}-${idx}`}>
                <div
                  className="flex items-center justify-between p-2 bg-stone-200 cursor-pointer"
                  onClick={() => handleSelectUser(item.username, idx)}
                >
                  <p>{item.username}</p>
                  <div className="flex gap-2 items-center justify-end">
                    {isLoading && isOpen && <div className="animate-spin h-[24px]"><LoadingSpinner variant="dark" /></div>}
                    <div
                      className={`h-[32px] transition-transform duration-300 ${isOpen && !isLoading ? "rotate-180" : "rotate-0"}`}
                    >
                      <ChevronDown />
                    </div>
                  </div>
                </div>
                <div
                  className={`transition-wrapper ${isOpen && !isLoading ? "open" : ""}`}
                  style={{ overflow: isOpen ? "auto" : "hidden", maxHeight: isOpen ? '1000px' : '0' }}
                >
                  {!!repositoryData?.length && !isLoading && (
                    <ListRepository repoData={repositoryData} />
                  )}
                  {!!repositoryData && repositoryData.length == 0 && (
                    <p className="p-2 text-sm">User repository not found</p>
                  )}
                </div>
              </div>
            )
          })}
          {!!errorStatus?.error && !isLoading && <SnackBar message={errorStatus?.message || ''} className="-bottom-20 right-0" />}
        </div>
      )}
    </div>
  )
}

export default ListUser
