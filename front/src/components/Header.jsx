import logo from '../assets/icon-left-font-monochrome-white.svg'

export default function Header() {

    return (
        <header className="flex align-center justify-center p-6 bg-blue-900">
            <img src={logo} alt="Groupomania" className="flex max-h-10" />
        </header>
    )
}