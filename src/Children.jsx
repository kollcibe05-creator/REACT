import { useContext } from "react";
import { UserContext } from "./Context";

function Children (props) {
    const{children, data} = props
    const user = useContext(UserContext)
    console.log(user)
    return (
        <>
        <div>
                 Nothing special init
        </div>
        {children} {/*/Very important*/}
        </>
    )
}
export default Children;