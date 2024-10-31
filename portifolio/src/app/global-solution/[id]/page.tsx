"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; 
import { GlobalSolution } from "@/types/global"; // Certifique-se de que o caminho esteja correto
import React from "react";

export default function EditarGlobalSolution() {
    const navigate = useRouter();
    const params = useParams(); 
    const id = params.id;

    const [global, setGlobal] = useState<GlobalSolution>({
        id: 0,
        aluno: "",
        materia: "",
        nota: 0.0,
        data: "",
        feedback: "",
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:3000/api/base-global/${id}`);
            const data = await response.json();
            setGlobal(data);
        };
        if (id) {
            chamadaApi();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/base-global/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(global)
            });

            if (response.ok) {
                alert("Global Solution atualizada com sucesso!");
                setGlobal({
                    id: 0,
                    aluno: "",
                    materia: "",
                    nota: 0.0,
                    data: "",
                    feedback: "",
                });
                navigate.push("/global-solution");
            }

        } catch (error) {
            console.error("Erro na atualização da Global Solution...", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-400 mb-6">Editar Global Solution</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">NOME DO ALUNO</label>
                        <input
                            type="text"
                            name="aluno"
                            value={global.aluno}
                            onChange={(evento) => setGlobal({ ...global, aluno: evento.target.value })}
                            placeholder="Digite o nome do aluno"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">NOME DA AVALIAÇÃO</label>
                        <input
                            type="text"
                            name="materia"
                            value={global.materia}
                            onChange={(evento) => setGlobal({ ...global, materia: evento.target.value })}
                            placeholder="Digite a matéria da avaliação"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">NOTA</label>
                        <input
                            type="number"
                            name="nota"
                            value={global.nota}
                            onChange={(evento) => setGlobal({ ...global, nota: parseFloat(evento.target.value) })}
                            placeholder="Digite a nota da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">DATA</label>
                        <input
                            type="date"
                            name="data"
                            value={global.data}
                            onChange={(evento) => setGlobal({ ...global, data: evento.target.value })}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">FEEDBACK</label>
                        <input
                            type="text"
                            name="feedback"
                            value={global.feedback}
                            onChange={(evento) => setGlobal({ ...global, feedback: evento.target.value })}
                            placeholder="Digite o feedback da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition font-semibold"
                        >
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
