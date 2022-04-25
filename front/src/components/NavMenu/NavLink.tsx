import { Menu } from "@headlessui/react";
import { ReactChild } from "react";
import { Link } from "react-router-dom";

interface NavOptionProps {
    handleClick?: React.MouseEventHandler<HTMLAnchorElement>;
    path?: string;
    children: ReactChild;
}

export function NavLink({ handleClick, path, children }: NavOptionProps) {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    to={path ? path : ""}
                    className={`flex justify-center items-center p-4 font-bold active:bg-blue-500 dark:active:bg-gray-600 
                        ${active ? "bg-blue-600  dark:bg-slate-700" : ""}
                    `}
                    onClick={handleClick}
                >
                    {children}
                </Link>
            )}
        </Menu.Item>
    );
}
