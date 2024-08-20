export default function Container ({ children, ...otherProps }) {
    return (
        <div className="container" {...otherProps}>{children}</div>
    );
}