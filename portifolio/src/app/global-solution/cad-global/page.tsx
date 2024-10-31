"use client";

import { GlobalSolution } from "@/types/global";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadGlobalSolution() {
    const navigate = useRouter();

    const [global, setGlobal] = useState<GlobalSolution>({
        id: 0,
        aluno: "",
        materia: "",
        nota: 0.0,
        data: "",
        feedback: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGlobal({ ...global, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/base-global', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(global),
            });

            if (response.ok) {
                alert("Global Solution cadastrada com sucesso.");
                setGlobal({
                    id: 0,
                    aluno: "",
                    materia: "",
                    nota: 0.0,
                    data: "",
                    feedback: "",
                });
                navigate.push('/global-solution');
            }
        } catch (error) {
            console.error("Falha ao cadastrar global solution: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold text-pink-400 mb-6">Global Solutions</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
                <h2 className="text-2xl font-semibold text-pink-400 mb-4">Adicionar GS</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome do Aluno</label>
                        <input
                            type="text"
                            name="aluno"
                            value={global.aluno}
                            onChange={handleChange}
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
                            value={global.materia}
                            onChange={handleChange}
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
                            value={global.nota}
                            onChange={handleChange}
                            placeholder="Digite a nota da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Data</label>
                        <input
                            type="date"
                            name="data"
                            value={global.data}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Feedback</label>
                        <input
                            type="text"
                            name="feedback"
                            value={global.feedback}
                            onChange={handleChange}
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
