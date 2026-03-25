function Child (props) {
    const {children, persona} = props
    return (
        <>
        <h1>Child: What is on your mind man.</h1>
        <p>{persona.name} is {persona.age} old. He is full of  {persona.value}.</p>
        {children}
        </>
    )
}
export default Child;