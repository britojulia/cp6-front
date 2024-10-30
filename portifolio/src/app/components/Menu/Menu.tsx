import Link from "next/link";

export default function Menu() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/produtos">Checkpoint</Link></li>
                <li><Link href="/produtos">Global Solutions</Link></li>
                <li><Link href="/produtos">Challenge</Link></li>
            </ul>
        </nav>
    )
}