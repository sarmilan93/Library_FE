import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <Link to="/author">Authors</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;