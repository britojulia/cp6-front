"use client";

import { GlobalSolution } from "@/types/global";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";
import Image from "next/image";
import LogoFiap from "@/image/fiap-global.jpg";

export default function Global() {
    const [globals, setGlobals] = useState<GlobalSolution[]>([]);

    const chamadaApi = async () => {
        const response = await fetch("http://localhost:3000/api/base-global");
        const data = await response.json();

        setGlobals(data);
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/base-global/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Global Solution excluída com sucesso.");
                chamadaApi();
            }
        } catch (error) {
            console.error("Falha ao remover a Global Solution: ", error);
        }
    };

    return (
        <div className="bg-black min-h-screen p-5">
            <div className="max-w-6xl mx-auto">
                {/* Centralizando a imagem */}
                <div className="flex justify-center mb-4">
                    <Image src={LogoFiap} alt="Logo fiap" className="w-56 h-auto" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-2 text-center">Global Solution</h2>
                <h3 className="text-2xl text-white mb-4 text-center">
                    Projetos ou avaliações integradoras, que envolvem a aplicação global dos conhecimentos adquiridos
                </h3>
                <div className="mb-6 flex justify-center">
                    <nav>
                        <ul>
                            <li>
                                <Link href="/global-solution/cad-global" className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">
                                    Cadastrar novo GS
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <table className="min-w-full bg-gray-900 text-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">ALUNO</th>
                            <th className="py-2 px-4">MATERIA</th>
                            <th className="py-2 px-4">NOTA</th>
                            <th className="py-2 px-4">DATA</th>
                            <th className="py-2 px-4">FEEDBACK</th>
                            <th className="py-2 px-4">EDITAR | EXCLUIR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {globals.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-800">
                                <td className="py-2 px-4">{p.id}</td>
                                <td className="py-2 px-4">{p.aluno}</td>
                                <td className="py-2 px-4">{p.materia}</td>
                                <td className="py-2 px-4">{p.nota}</td>
                                <td className="py-2 px-4">{p.data}</td>
                                <td className="py-2 px-4">{p.feedback}</td>
                                <td className="py-2 px-4 flex justify-center items-center">
                                    <Link href={`/global-solution/${p.id}`} className="text-pink-500 hover:text-pink-600 transition mr-2">
                                        <Editar className="inline text-3xl" />
                                    </Link>
                                    <Link href="#" onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-600 transition">
                                        <Excluir className="inline text-3xl" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} className="py-2 px-4 text-center">
                                Quantidade de global já realizadas: {globals.length}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
