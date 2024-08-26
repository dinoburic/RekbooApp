import logo from '../assets/logo.png'

export default function Header() {
    return(
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='Rekboo logo' />
            </div>
            <nav>
                <button>Cart (0)</button>
            </nav>
        </header>
    );
}