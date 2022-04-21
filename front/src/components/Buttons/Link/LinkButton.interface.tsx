import { ReactChild } from "react";

export default interface ILinkButtonProps {
    onClick?: React.MouseEventHandler;
    path?: string;
    children?: ReactChild;
    className?: string;
}
