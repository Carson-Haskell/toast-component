import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');
  const [showToast, setShowToast] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);

  function handleDismiss(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  function handleAddToast(event) {
    event.preventDefault();
    setShowToast(true);
    setToasts([
      ...toasts,
      {
        message,
        variant,
        id: crypto.randomUUID(),
      },
    ]);
    setMessage('');
    setVariant('notice');
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleVariantChange(event) {
    setVariant(event.target.value);
  }

  return (
    <ToastContext.Provider value={{ message, variant, toasts, showToast, handleDismiss, handleAddToast, handleVariantChange, handleMessageChange }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
