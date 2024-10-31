"use client";

import { Checkpoint } from "@/types/checkpoint";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadCheckpoint() {
    const navigate = useRouter();

    const [checkpoint, setChekpoint] = useState<Checkpoint>({
        id: 0,
        aluno: "",
        materia: "",
        nota: 0.0,
        data: "",
        feedback: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChekpoint({ ...checkpoint, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/base-checkpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkpoint),
            });

            if (response.ok) {
                alert("Checkpoint cadastrado com sucesso.");
                setChekpoint({
                    id: 0,
                    aluno: "",
                    materia: "",
                    nota: 0.0,
                    data: "",
                    feedback: "",
                });
                navigate.push('/checkpoint');
            }
        } catch (error) {
            console.error("Falha ao cadastrar checkpoint: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold text-pink-400 mb-6">CheckPoints</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-pink-400 mb-4">Adicionar CPS</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome do Aluno</label>
                        <input
                            type="text"
                            name="aluno"
                            value={checkpoint.aluno}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite o nome do aluno"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome da Avaliação</label>
                        <input
                            type="text"
                            name="materia"
                            value={checkpoint.materia}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite a matéria da avaliação"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Nota</label>
                        <input
                            type="number"
                            name="nota"
                            value={checkpoint.nota}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite a nota da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Data</label>
                        <input
                            type="date"
                            name="data"
                            value={checkpoint.data}
                            onChange={(evento) => handleChange(evento)}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Feedback</label>
                        <input
                            type="text"
                            name="feedback"
                            value={checkpoint.feedback}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite o feedback da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition font-semibold"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
