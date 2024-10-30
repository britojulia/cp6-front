"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useParams } from "next/navigation"; 
import { GlobalSolution } from "@/types/global"; // Assegure-se de que o caminho esteja correto
import React from "react";

export default function EditarGlobalSolution() {
    const navigate = useRouter();
    const params = useParams(); // Obtenha os parâmetros usando useParams
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
    <div>
        <h1>Editar Global Solution</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idCheckpoint"> Checkpoint </label>
                    <label>NOME DO ALUNO</label>
                    <input type="text" name="nome" value={global.aluno} onChange={(evento) => setGlobal({ ...global, aluno: evento.target.value })} />
                </div>
                <div>
                    <label>NOME DA AVALIAÇÃO</label>
                    <input type="text" name="materia" value={global.materia} onChange={(evento) => setGlobal({ ...global, materia: evento.target.value })} />
                </div>
                <div>
                    <label>NOTA</label>
                    <input type="number" name="nota" value={global.nota} onChange={(evento) => setGlobal({ ...global, nota: parseFloat(evento.target.value) })} />
                </div>
                <div>
                    <label>DATA</label>
                    <input type="date" name="data" value={global.data} onChange={(evento) => setGlobal({ ...global, data: evento.target.value })} />
                </div>
                <div>
                    <label>FEEDBACK</label>
                    <input type="text" name="feedback" value={global.feedback} onChange={(evento) => setGlobal({ ...global, feedback: evento.target.value })} />
                </div>
                <div>
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    </div>
);
}