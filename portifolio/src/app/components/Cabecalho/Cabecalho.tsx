import Link from "next/link";

export default function Cabecalho() {
    return (
    <header className="bg-gray-900 text-white p-5">
        <h1 className="text-3xl text-center text-pink-400">FIAP</h1>
        <div>
                <nav>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/checkpoint">Checkpoint</Link></li>
                        <li><Link href="/produtos">Global Solutions</Link></li>
                        <li><Link href="/produtos">Challenge</Link></li>
                    </ul>
                </nav>
            </div>
    </header>
    );
}