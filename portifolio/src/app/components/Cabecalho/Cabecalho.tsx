import Link from "next/link";

export default function Cabecalho() {
    return (
        <header className="bg-gray-900 text-white p-5">
            <h1 className="text-3xl text-center text-pink-400">FIAP</h1>
            <nav className="mt-4 text-center">
                <ul className="space-x-4 inline-flex">
                    <li>
                        <Link href="/" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/checkpoint" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">
                            Checkpoint
                        </Link>
                    </li>
                    <li>
                        <Link href="/global-solution" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">
                            Global Solutions
                        </Link>
                    </li>
                    <li>
                        <Link href="/challange" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">
                            Challenge
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
