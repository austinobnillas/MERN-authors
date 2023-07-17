import React, {useState,} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const NewAuthorForm = (props) => {
    const [name, setName] = useState();
    const {allAuthors, setAllAuthors} = props;
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/authors/add', {name})
            .then((res) => {
                console.log(res.data);
                setName("");
                setAllAuthors([...allAuthors, res.data]);
                navigate("/authors");
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors;
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return(
        <div className="container">
            <Link to="/authors">Home</Link>
            <form onSubmit={submitHandler}>

            {errors.map((err, index) => (
                    <p key="{index}">{err}</p>
                ))}

                <div>
                    <h3>Add a new author:</h3>
                </div>
                <div>
                    <label htmlFor="authorName">Name: </label>
                    <input type="text" name="authorName" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <Link to="/authors">Cancel</Link>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}
export default NewAuthorForm;