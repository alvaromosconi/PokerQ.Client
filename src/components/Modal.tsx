import { useEffect, useRef } from "react"

type ModalProps = {
    openModal: boolean
    closeModal: () => void
    children: React.ReactNode
}

function Modal({ openModal, closeModal, children }: ModalProps) {
    const ref = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if (openModal) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [openModal])

    const handleCloseModal = () => {
        closeModal()
    }

    return (
        <dialog
            ref={ref}
            onCancel={handleCloseModal}
            className="rounded-xl"
        >
            <div className="container h-full w-full flex flex-col">
                <button    
                    onClick={handleCloseModal}
                    className="self-end mr-4 mt-2 text-2xl text-gray-500 hover:opacity-80 hover:scale-110"
                >
                    X
                </button>
                {children}
            </div>
        </dialog>
    )
}

export default Modal
