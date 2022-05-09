import { ReactChild, useState } from "react";

const SubmitButton = ({
    children,
    className,
    onClick,
}: {
    children: ReactChild;
    className: string;
    onClick: Function;
}) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
    };

    return (
        <button onClick={handleClick} className={className} disabled={loading}>
            {children}
        </button>
    );
};
export default SubmitButton;
