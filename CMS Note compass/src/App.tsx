import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Homepage from './pages/DashBoard/DashBoard';
import NotesHomepage from './pages/Notes/NotesHomepage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignupPage/SignUpPage';
import AddNotesPage from './pages/Notes/AddNotesPage';
import CategoriesHomePage from './pages/Categories/CategoriesHomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/notes' element={<NotesHomepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/categories' element={<CategoriesHomePage/>}/>
        <Route path='/notes/new' element={<AddNotesPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
