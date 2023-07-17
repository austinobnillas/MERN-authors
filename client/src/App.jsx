import './App.css';
import DisplayAllAuthors from './components/DisplayAllAuthors';
import NewAuthorForm from './components/AddNewAuthor';
import UpdateAuthorForm from './components/UpdateAuthor';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [allAuthors, setAllAuthors] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/authors')
      .then((res) => {setAllAuthors(res.data);
        console.log(res.data);})
      .catch((err) => console.log(err));
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <h1>Favorite Authors</h1>
        <Routes>
          <Route path='/authors' element={<DisplayAllAuthors allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
          <Route path='/authors/add' element={<NewAuthorForm allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
          <Route path={'/authors/edit/:id'} element={<UpdateAuthorForm allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
