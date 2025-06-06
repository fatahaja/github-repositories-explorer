import { useEffect, useState } from "react"

interface IProps {
  message: string,
  autoCloseMs?: number
  className?: string
}

const SnackBar = ({ message, autoCloseMs = 3000, className }: IProps) => {
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false)
    }, autoCloseMs)

    return () => clearTimeout(timer)
  }, [autoCloseMs])

  return (
    <div className={`absolute animate-pulse ${isShow ? '' : 'hidden'} ${className}`}>
      <div className="z-50 min-w-64 max-w-80 py-2 px-6 bg-gray-50 border border-l-4 border-red-500 rounded-xl text-sm flex gap-8 items-center justify-between">
        <p>{message}</p>
        <button className="text-blue-500 text-sm cursor-pointer font-bold" onClick={() => setIsShow(false)}>Close</button>
      </div>
    </div>
  )
}

export default SnackBar