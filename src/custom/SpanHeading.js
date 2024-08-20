export default function SpanHeading ({ children, ...otherProps }) {
    return (
        <h2 className="heading" {...otherProps}>{children}</h2>
    );
}