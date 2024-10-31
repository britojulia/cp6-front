"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; 
import { Checkpoint } from "@/types/checkpoint"; // Certifique-se de que o caminho esteja correto

export default function EditarCheckpoint() {
    const navigate = useRouter();
    const params = useParams();
    const id = params.id;

    const [checkpoint, setCheckpoint] = useState<Checkpoint>({
        id: 0,
        aluno: "",
        materia: "",
        nota: 0.0,
        data: "",
        feedback: "",
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:3000/api/base-checkpoint/${id}`);
            const data = await response.json();
            setCheckpoint(data);
        };
        if (id) {
            chamadaApi();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/base-checkpoint/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(checkpoint)
            });

            if (response.ok) {
                alert("Checkpoint atualizado com sucesso!");
                setCheckpoint({
                    id: 0,
                    aluno: "",
                    materia: "",
                    nota: 0.0,
                    data: "",
                    feedback: "",
                });
                navigate.push("/checkpoint");
            }

        } catch (error) {
            console.error("Erro na atualização do checkpoint...", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-400 mb-6">Editar CheckPoints</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">NOME DO ALUNO</label>
                        <input
                            type="text"
                            name="aluno"
                            value={checkpoint.aluno}
                            onChange={(evento) => setCheckpoint({ ...checkpoint, aluno: evento.target.value })}
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
                            value={checkpoint.materia}
                            onChange={(evento) => setCheckpoint({ ...checkpoint, materia: evento.target.value })}
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
                            value={checkpoint.nota}
                            onChange={(evento) => setCheckpoint({ ...checkpoint, nota: parseFloat(evento.target.value) })}
                            placeholder="Digite a nota da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">DATA</label>
                        <input
                            type="date"
                            name="data"
                            value={checkpoint.data}
                            onChange={(evento) => setCheckpoint({ ...checkpoint, data: evento.target.value })}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">FEEDBACK</label>
                        <input
                            type="text"
                            name="feedback"
                            value={checkpoint.feedback}
                            onChange={(evento) => setCheckpoint({ ...checkpoint, feedback: evento.target.value })}
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
