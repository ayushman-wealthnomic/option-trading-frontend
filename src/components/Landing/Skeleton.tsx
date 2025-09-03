

const Skeleton: React.FC<{ className?: string; isCircle?: boolean }> = ({
    className = "h-44",
    isCircle = false
}) => (
    <div
        className={`${className} ${isCircle ? 'rounded-full' : 'rounded-xl'} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-pulse border border-gray-200`}
        style={{
            animation: 'shimmer 2s infinite',
            background: 'linear-gradient(90deg, rgba(0,0,0,.12) 25%, rgba(255,255,255,.15) 37%, rgba(0,0,0,.12) 63%)',
            backgroundSize: '400% 100%',
        }}
    />
);

export default Skeleton;