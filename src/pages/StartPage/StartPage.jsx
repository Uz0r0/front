import './../../App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from './../../assets/searchIcon.png';
import burgerIcon from './../../assets/burger.png';
import Start from '../../components/Start/Start';

function StartPage() {  
    const navigate = useNavigate();
    const books = [
        { "id": 1, "title": "Сынган кылыч" },
        { "id": 2, "title": "Манас" },
        { "id": 3, "title": "Кедейкан" },
        { "id": 4, "title": "Кожожаш" },
        { "id": 5, "title": "Ак кеме" },
        { "id": 6, "title": "Кылым карытар бир кун" },
        { "id": 7, "title": "Жамиля" },
        { "id": 8, "title": "Сарала Ит" },
    ];

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [active, setActive] = useState(null);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBookClick = (id) => {
        setActive(id);
        navigate(`/works/${id}/chapters/1`);
    };

    return (
        <div className={`body ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <nav id="sidebar" className={sidebarOpen ? "open" : "closed"}>
                <div className="sidebar-top">    
                    <button 
                        id="toggle-btn" 
                        className={`burger ${sidebarOpen ? "shifted" : ""}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <img src={burgerIcon} alt="menu" />
                    </button>                  
                    <div className={`search ${sidebarOpen ? "show" : "hide"}`}>    
                        <button>
                            <img src={searchIcon} alt="search" />
                        </button>
                        <input 
                            type="text" 
                            placeholder="Издоо" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </div>
                </div>
                <ul className={`book-list ${sidebarOpen ? "show" : "hide"}`}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <li key={book.id}>
                                <button 
                                    className={`book-btn ${active === book.id ? "active" : ""}`} 
                                    onClick={() => handleBookClick(book.id)}
                                >
                                    {book.title}
                                </button>
                            </li>
                        ))
                    ) : (
                        <li><p className="error">Эч нерсе табылган жок</p></li>
                    )}
                </ul>
                <div className={`umai ${sidebarOpen ? "show" : "hide"}`}>
                    <p>Umai suroo</p>
                </div>
            </nav>
            <main>
                <div className='header'>
                    <Start />
                </div>
            </main>
        </div>
    );
}

export default StartPage;
