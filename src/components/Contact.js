const Contact = () => {
    return (
        <div> 
            <h1 className="font-bold p-4 m-4 text-3xl">Contact US page</h1>
            <form>
                <input type="text" className="border border-black p-2 m-2" placeholder="name" />
                <input type="text" className="border border-black p-2 m-2" 
                placeholder="message" />

                <button className="bordr border-black p-2 m-2 bg-gray-100 rounded-lg">
                submit</button>

            </form>

        </div>
    );
};

export default Contact;