import { Menu } from "@headlessui/react";
import { ReactChild } from "react";
import { Link } from "react-router-dom";

interface NavOptionProps {
    handleClick?: Function;
    path: string;
    children: ReactChild;
}

export function NavOption({ handleClick, path, children }: NavOptionProps) {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    to={path}
                    className={`
                        flex justify-center items-center p-4 font-bold
                        ${active ? "bg-blue-600" : ""}
                    `}
                    onClick={() => handleClick()}
                >
                    {children}
                </Link>
            )}
        </Menu.Item>
    );
}
