import { AnimatePresence, motion } from "framer-motion";

export function DropdownMenu({ isOpen, onToggle, label, children }) {
    return (
        <div className="relative">
            <button onClick={onToggle} className="cursor-pointer text-lg px-3 py-1 border-1 border-gray-400 hover:bg-gray-100 rounded-md transition-all duration-300">
                {label}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-400 rounded-md z-10 shadow-md max-h-50 overflow-y-auto"
                    >
                        <ul className="">
                            {children}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}