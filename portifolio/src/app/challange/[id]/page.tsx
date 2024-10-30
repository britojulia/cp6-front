"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useParams } from "next/navigation"; 
import { Challenge } from "@/types/challenge";
import React from "react";

export default function EditarChallenge() {
    const navigate = useRouter();
    const params = useParams(); // Obtenha os parâmetros usando useParams
    const id = params.id;

    const [challenge, setChallenge] = useState<Challenge>({
        id: 0,
        aluno: "",
        materia: "",
        nota: 0.0,
        data: "",
        feedback: "",
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:3000/api/base-challenge/${id}`);
            const data = await response.json();
            setChallenge(data);
        };
        if (id) {
            chamadaApi();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/base-challenge/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(challenge)
            });

            if (response.ok) {
                alert("Challenge atualizado com sucesso!");
                setChallenge({
                    id: 0,
                    aluno: "",
                    materia: "",
                    nota: 0.0,
                    data: "",
                    feedback: "",
                });
                navigate.push("/challenge");
            }

        } catch (error) {
            console.error("Erro na atualização do challenge...", error);
        }
    }

return (
    <div>
        <h1>Editar Challenge</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idChallenge"> Challenge </label>
                    <label>NOME DO ALUNO</label>
                    <input type="text" name="nome" value={challenge.aluno} onChange={(evento) => setChallenge({ ...challenge, aluno: evento.target.value })} />
                </div>
                <div>
                    <label>NOME DA AVALIAÇÃO</label>
                    <input type="text" name="materia" value={challenge.materia} onChange={(evento) => setChallenge({ ...challenge, materia: evento.target.value })} />
                </div>
                <div>
                    <label>NOTA</label>
                    <input type="number" name="nota" value={challenge.nota} onChange={(evento) => setChallenge({ ...challenge, nota: parseFloat(evento.target.value) })} />
                </div>
                <div>
                    <label>DATA</label>
                    <input type="date" name="data" value={challenge.data} onChange={(evento) => setChallenge({ ...challenge, data: evento.target.value })} />
                </div>
                <div>
                    <label>FEEDBACK</label>
                    <input type="text" name="feedback" value={challenge.feedback} onChange={(evento) => setChallenge({ ...challenge, feedback: evento.target.value })} />
                </div>
                <div>
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
    </div>
);
}