import { createContext, useContext, useState } from 'react'

import Toast, { Props as ToastProps, Variant } from '@/components/Notification/Toast'

export type Nullable<T> = T | null

type NotifyFn = (message: string) => void

type Notification = {
  success: NotifyFn
  warning: NotifyFn
  error: NotifyFn
  info: NotifyFn
}

export const NotificationContext = createContext<Nullable<Notification>>(null)

type ToastType = Omit<ToastProps, 'onClose'>

const Notification: React.FC = ({ children }) => {
  const [toast, setToast] = useState<Nullable<ToastType>>(null)
  const notifyFnFactory =
    (variant: Variant): NotifyFn =>
    (message) =>
      setToast({ variant, message })

  return (
    <NotificationContext.Provider
      value={{
        success: notifyFnFactory('success'),
        warning: notifyFnFactory('warning'),
        error: notifyFnFactory('error'),
        info: notifyFnFactory('info'),
      }}
    >
      {children}
      {toast && (
        <Toast variant={toast.variant} message={toast.message} onClose={() => setToast(null)} />
      )}
    </NotificationContext.Provider>
  )
}

export default Notification

export const useNotification = () => useContext(NotificationContext)
