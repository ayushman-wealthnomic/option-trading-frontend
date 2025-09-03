
interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'ghost';
    href?: string;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    href,
    onClick,
    className = ''
}) => {
    const baseClasses = "inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold tracking-wide border-0 cursor-pointer transition-all duration-200";
    const primaryClasses = "bg-blue-600 text-white shadow-lg hover:bg-blue-700";
    const ghostClasses = "bg-gray-100 text-blue-600 border border-blue-300 hover:bg-blue-50";

    const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : ghostClasses} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
};

export default Button;