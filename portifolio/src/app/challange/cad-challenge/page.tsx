"use client";

import { Challenge } from "@/types/challenge";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadChallenge() {
    const navigate = useRouter();

    const [challenge, setChallenge] = useState<Challenge>({
        id: 0,
        aluno: "",
        materia: "",
        nota: 0.0,
        data: "",
        feedback: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChallenge({ ...challenge, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/base-challange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(challenge),
            });

            if (response.ok) {
                alert("Challenge cadastrado com sucesso.");
                setChallenge({
                    id: 0,
                    aluno: "",
                    materia: "",
                    nota: 0.0,
                    data: "",
                    feedback: "",
                });
                navigate.push('/challange');
            }
        } catch (error) {
            console.error("Falha ao cadastrar challenge: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-400 mb-6">Challenges</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
                <h2 className="text-2xl font-semibold text-pink-400 mb-4">Adicionar Challenge</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">NOME DO ALUNO</label>
                        <input
                            type="text"
                            name="aluno"
                            value={challenge.aluno}
                            onChange={handleChange}
                            placeholder="Digite o nome do aluno"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">NOME DA AVALIAÇÃO</label>
                        <input
                            type="text"
                            name="materia"
                            value={challenge.materia}
                            onChange={handleChange}
                            placeholder="Digite a matéria da avaliação"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">NOTA</label>
                        <input
                            type="number"
                            name="nota"
                            value={challenge.nota}
                            onChange={handleChange}
                            placeholder="Digite a nota da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">DATA</label>
                        <input
                            type="date"
                            name="data"
                            value={challenge.data}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">FEEDBACK</label>
                        <input
                            type="text"
                            name="feedback"
                            value={challenge.feedback}
                            onChange={handleChange}
                            placeholder="Digite o feedback da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
