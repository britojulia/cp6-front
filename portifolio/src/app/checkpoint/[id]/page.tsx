"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useParams } from "next/navigation"; 
import { Checkpoint } from "@/types/checkpoint"; // Assegure-se de que o caminho esteja correto
import React from "react";

export default function EditarCheckpoint() {
    const navigate = useRouter();
    const params = useParams(); // Obtenha os parâmetros usando useParams
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
    <div>
        <h1>Editar CheckPoints</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idCheckpoint"> Checkpoint </label>
                    <label>NOME DO ALUNO</label>
                    <input type="text" name="nome" value={checkpoint.aluno} onChange={(evento) => setCheckpoint({ ...checkpoint, aluno: evento.target.value })} />
                </div>
                <div>
                    <label>NOME DA AVALIAÇÃO</label>
                    <input type="text" name="materia" value={checkpoint.materia} onChange={(evento) => setCheckpoint({ ...checkpoint, materia: evento.target.value })} />
                </div>
                <div>
                    <label>NOTA</label>
                    <input type="number" name="nota" value={checkpoint.nota} onChange={(evento) => setCheckpoint({ ...checkpoint, nota: parseFloat(evento.target.value) })} />
                </div>
                <div>
                    <label>DATA</label>
                    <input type="date" name="data" value={checkpoint.data} onChange={(evento) => setCheckpoint({ ...checkpoint, data: evento.target.value })} />
                </div>
                <div>
                    <label>FEEDBACK</label>
                    <input type="text" name="feedback" value={checkpoint.feedback} onChange={(evento) => setCheckpoint({ ...checkpoint, feedback: evento.target.value })} />
                </div>
                <div>
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    </div>
);
}