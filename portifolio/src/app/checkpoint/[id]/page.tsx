"use client";

import { Checkpoint } from "@/types/checkpoint";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarCheckpoint({ params }: { params: { id: number } }) {
    
    const navigate = useRouter();

    const [checkpoint, setChekpoint] = useState<Checkpoint>({
        id: 0,
        aluno:"",
        materia:"",
        nota: 0.0,
        data: "",
        feedback:"",
});

useEffect(() => {
    const chamadaApi = async () => {
    const response = await fetch(
        `http://localhost:3000/api/base-checkpoint/${params.id}`
);
    const data = await response.json();
    setChekpoint(data);
    };
    chamadaApi();
}, [params]);

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:3000/api/base-checkpoint/${params.id}`,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(checkpoint)            
        });

            if(response.ok){
                alert("Checkpoint atualizado com sucesso!");
                setChekpoint({
                    id: 0,
                    aluno:"",
                    materia:"",
                    nota: 0.0,
                    data: "",
                    feedback:"",
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
                    <input type="text" name="nome" value={checkpoint.aluno} onChange={(evento) => setChekpoint({ ...checkpoint, aluno: evento.target.value })} />
                </div>
                <div>
                    <label>NOME DA AVALIAÇÃO</label>
                    <input type="text" name="materia" value={checkpoint.materia} onChange={(evento) => setChekpoint({ ...checkpoint, materia: evento.target.value })} />
                </div>
                <div>
                    <label>NOTA</label>
                    <input type="number" name="nota" value={checkpoint.nota} onChange={(evento) => setChekpoint({ ...checkpoint, nota: parseFloat(evento.target.value) })} />
                </div>
                <div>
                    <label>DATA</label>
                    <input type="date" name="data" value={checkpoint.data} onChange={(evento) => setChekpoint({ ...checkpoint, data: evento.target.value })} />
                </div>
                <div>
                    <label>FEEDBACK</label>
                    <input type="text" name="feedback" value={checkpoint.feedback} onChange={(evento) => setChekpoint({ ...checkpoint, feedback: evento.target.value })} />
                </div>
                <div>
                    <button type="submit">Atualizar</button>
                </div>
            </form>
        </div>
        <div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Atualizar</button>
        </div>
    </div>
);
}