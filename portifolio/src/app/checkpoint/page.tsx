"use client";

import { Checkpoint } from "@/types/checkpoint";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";
import Image from "next/image";
import LogoFiap from "@/image/fiap-cp.jpg";

export default function Checkpoints() {
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

    const chamadaApi = async () => {
        const response = await fetch("http://localhost:3000/api/base-checkpoint");
        const data = await response.json();
        
        setCheckpoints(data);
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/base-checkpoint/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Checkpoint excluído com sucesso.");
                chamadaApi();
            }
        } catch (error) {
            console.error("Falha ao remover o checkpoint: ", error);
        }
    };

    return (
        <div className="bg-black min-h-screen p-5 flex flex-col items-center">
            <div className="max-w-6xl w-full">
                <div className="flex justify-center mb-5">
                    <Image src={LogoFiap} alt="Logo fiap" className="w-48 h-auto" /> {/* Diminuindo a largura da imagem */}
                </div>
                <h2 className="text-4xl font-bold text-white mb-2 text-center">Checkpoints</h2>
                <h3 className="text-2xl text-white mb-4 text-center">Avaliações intermediárias para acompanhamento do progresso</h3>
                <div className="mb-6 text-center">
                    <nav>
                        <ul>
                            <li>
                                <Link href="/checkpoint/cad-checkpoint" className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">
                                    Cadastrar novo CP
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
                        {checkpoints.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-800">
                                <td className="py-2 px-4">{p.id}</td>
                                <td className="py-2 px-4">{p.aluno}</td>
                                <td className="py-2 px-4">{p.materia}</td>
                                <td className="py-2 px-4">{p.nota}</td>
                                <td className="py-2 px-4">{p.data}</td>
                                <td className="py-2 px-4">{p.feedback}</td>
                                <td className="py-2 px-4 flex items-center">
                                    <Link href={`/checkpoint/${p.id}`} className="text-pink-500 hover:text-pink-600 transition mr-2">
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
                                Quantidade de checkpoints já realizadas: {checkpoints.length}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
