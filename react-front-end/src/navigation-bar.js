import "./styles/Navbar.css"

export default function Navbar(){
    return <nav className="nav">
        <a href="/" className="Medicore_Nav">
            Medicore
        </a>
        <ul>
            <li>
                <a href="/patientLogin">Login</a>
            </li>
        </ul>
    </nav>
}