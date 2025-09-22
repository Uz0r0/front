import './../../App.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import searchIcon from './../../assets/searchIcon.png';
import burgerIcon from './../../assets/burger.png';
import Start from '../../components/Start/Start';

function MainPage() {
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

    const { bookId, chapter } = useParams();

    const [active, setActive] = useState(() => Number(bookId) || books[0].id);
    const [page, setPage] = useState(() => Number(chapter) || 1);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const url = `/works/${active}/chapters/${page}`;
        if (window.location.pathname !== url) {
            navigate(url, { replace: true });
        }
    }, [active, page, navigate]);

    useEffect(() => {
    const fetchPage = async () => {
        setLoading(true);

        try {
        
        const res = await axios.get(
            `http://localhost:8000/works/${Number(active)}/chapters/${Number(page)}`
        );

        
        if (res.data && res.data.text) {
            setContent(res.data.text);
        } else {
            setContent("Бул бөлүм үчүн эч кандай текст жок.");
        }
        } catch (err) {
        console.error(err); 
        setContent("Баракты жүктөө катасы");
        } finally {
        setLoading(false);
        }
    };

    fetchPage();
    }, [active, page]);

    const handleBookClick = (id) => {
        setActive(id);   
        setPage(1);
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
                <div className="tittle">
                    {books.find(book => book.id === active)?.title}
                </div>
                {loading ? (
                    <p>Жүктөө...</p>
                ) : (
                    <div className='content' style={{ whiteSpace: "pre-line" }}>
                        <p>{content}</p>
                    </div>
                )}
                <div className='page-control'>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}    
                    >
                        <img src={searchIcon} alt="" />
                    </button>

                        <p>{page}</p>

                    <button
                        onClick={() => setPage(page + 1)}
                    >
                        <img src={burgerIcon} alt="" />
                    </button>
                </div>
            </main>
        </div>  
    )
}

export default MainPage;
