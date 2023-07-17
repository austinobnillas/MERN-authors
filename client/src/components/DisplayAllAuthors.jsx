import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const DisplayAllAuthors = (props) => {
    const {allAuthors, setAllAuthors} = props;

    const deleteHandler = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/authors/delete/${id}`)
            .then((res) => {
                console.log(res.data);
                const newAuthorsList = allAuthors.filter((author, index) => author._id !== id)
                setAllAuthors(newAuthorsList)
            })
    }

    return(
        <div className="containter">
            <Link to="/authors/add">Add an Author</Link>
            <table>
                <thead>
                    <tr>
                        <th>Authors</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {allAuthors.map((author , index) => (
                        <tr key={index}>
                            <td>{author.name}</td>
                            <td>
                                <Link to={`/authors/edit/${author._id}`}>Edit</Link>
                                <button onClick={() => deleteHandler(author._id)}>Delete</button>
                            </td>
                        </tr>
            
                    ))}
                </tbody>
            </table>
        </div>
    )
} 

export default DisplayAllAuthors;