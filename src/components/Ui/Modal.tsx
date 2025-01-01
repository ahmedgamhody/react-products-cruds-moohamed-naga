import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
interface IModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  closeModal: () => void;
}
export default function Modal({
  isOpen,
  title,
  children,
  closeModal,
}: IModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <div className="fixed inset-0  backdrop-blur-sm" aria-hidden="true">
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {title && (
                      <Dialog.Title
                        as="h3"
                        className="font-bold text-xl leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </div>
      </Transition>
    </>
  );
}
