import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed bg-opacity-70 bg-gray-900 inset-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-gray-500 p-8 rounded-lg w-full max-w-md relative"
        onClick={(e)=>e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <button 
          className="absolute top-2 right-4 text-2xl font-bold hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
