function Children (props) {
    const{children, data} = props
    return (
        <>
        <div>
            Normal component in the normal stack.
        </div>
        {children} //Very important
        </>
    )
}