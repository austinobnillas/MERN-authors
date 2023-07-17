import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const UpdateAuthorForm = (props) => {
    const {allAuthors, setAllAuthors} = props;
    const [name, setName] = useState();
    const [errors, setErrors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/authors/${id}`)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name);
            })
            .catch((err) => {console.log(err)})
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.patch(`http://127.0.0.1:8000/api/authors/update/${id}`, {name: name})
            .then((res) => {
                console.log(res.data);
                const updatedAuthor = res.data;
                const updatedAllAuthors = allAuthors.map( author => {
                    return author._id === updatedAuthor._id ? updatedAuthor : author;
                })
                setAllAuthors(updatedAllAuthors);
                navigate('/authors')
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
                    <h3>Edit this Author:</h3>
                </div>
                <div>
                    <label className="form-label" htmlFor="authorName">Name: </label>
                    <input className="form-control" value={name} type="text" name="authorName" onChange={(e) => setName(e.target.value)}/>
                
                </div>
                <div>
                    <Link className="btn btn-secondary m-2" to="/authors">Cancel</Link>
                    <input className="btn btn-primary m-2" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}
export default UpdateAuthorForm;