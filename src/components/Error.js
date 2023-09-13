import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div className="text-center font-bold text-lg">
            <h1>Oops!</h1>
            <h2>Somthing went Wrong</h2>
        </div>
    );
};
export default Error;