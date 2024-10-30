import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import LogoFiap from "@/image/fiap-ads.png";

export default function Home() {
  return (
    <div className="bg-black min-h-screen p-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">Página Inicial</h1>
        <h2 className="text-2xl text-center mb-6 text-white">Membros do Grupo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {["Bruno", "Gustavo", "Leonardo", "Julia"].map((name, index) => (
            <div
              key={index}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <div className="mb-4">
                <Image src={LogoFiap} alt="logo fiap" className="w-24.1 h-auto" />
              </div>
              <h2 className="text-lg font-bold text-center">{name.toUpperCase()}</h2>
              <Link href="/" className="mt-2 inline-block text-pink-500 hover:text-pink-600 transition">
                <FaGithub className="text-2xl" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
