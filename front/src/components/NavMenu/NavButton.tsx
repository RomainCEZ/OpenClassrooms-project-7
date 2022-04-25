import { Menu } from "@headlessui/react";

export default function NavButton({ children, handleClick }) {
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    className={`
                        w-full p-4 font-bold dark:text-white active:bg-blue-500 
                        ${
                            active
                                ? "bg-blue-600 text-white dark:bg-slate-700"
                                : "text-blue-800"
                        }
                    `}
                    onClick={handleClick}
                >
                    {children}
                </button>
            )}
        </Menu.Item>
    );
}
