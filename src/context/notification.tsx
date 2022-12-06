import { createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type notificationStatus = 'success' | 'error' | 'warn' | 'info'

export const NotificationContext = createContext({
  notify: (message: string, status: notificationStatus) => {},
})

export const NotificationContextProvider = (props: any) => {
  const notify = (message: string, status: notificationStatus) => {
    const opt = {
      position: toast.POSITION.BOTTOM_LEFT,
    }
    switch (status) {
      case 'success':
        toast.success(message, opt)
        break
      case 'error':
        toast.error(message, opt)
        break
      case 'warn':
        toast.warn(message, opt)
        break
      case 'info':
        toast.info(message, opt)
        break
      default:
        toast(message, opt)
        break
    }
  }
  return (
    <NotificationContext.Provider value={{ notify: notify }}>
      <ToastContainer />
      {props.children}
    </NotificationContext.Provider>
  )
}
