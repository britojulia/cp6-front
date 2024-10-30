"use client"

import { Checkpoint } from "@/types/checkpoint";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CadCheckpoint() {
    const navigate = useRouter();

    const [checkpoint, setChekpoint] = useState<Checkpoint>({
        id: 0,
        aluno:"",
        materia:"",
        nota: 0.0,
        data: "",
        feedback:"",
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value} = e.target;
        // setProduto((preV) => ({...preV, [name]:value}));
        setChekpoint({...checkpoint, [name]:value});
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const  response = await fetch('http://localhost:3000/api/base-checkpoint', {
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
                        aluno:"",
                        materia:"",
                        nota: 0.0,
                        data: "",
                        feedback:"",
                    });
                    navigate.push('/checkpoint');
                }
        } catch (error) {
            console.error("Falha ao cadastrar checkpoint: ", error);
        }
    }

    return (
        <div>
            <h1>CheckPoints</h1>
            <div>
            <label htmlFor="idProduto"> Checkpoint </label>
                <form onSubmit={handleSubmit}>
                    <h2>Adicionar CPS</h2>
                    <div>
                        <label>NOME DO ALUNO</label>
                        <input type="text" name="nome" value={checkpoint.aluno} onChange={(evento)=>handleChange(evento)} placeholder="digite nome do aluno" required/>
                    </div>
                    <div>
                        <label>NOME DA AVALIAÇÃO</label>
                        <input type="text" name="materia" value={checkpoint.materia} onChange={(evento)=>handleChange(evento)} placeholder="digite a matéria da avaliação" required/>
                    </div>
                    <div>
                        <label>NOTA</label>
                        <input type="number" name="nota" value={checkpoint.nota} onChange={(evento)=>handleChange(evento)} placeholder="digite a nota da avaliação"/>
                    </div>
                    <div>
                        <label>DATA</label>
                        <input type="date" name="data" value={checkpoint.data} onChange={(evento)=>handleChange(evento)} required/>
                    </div>
                    <div>
                        <label>FEEDBACK</label>
                        <input type="text" name="feedback" value={checkpoint.feedback} onChange={(evento)=>handleChange(evento)} placeholder="digite o feedback da avaliação"/>
                    </div>
                    <div>
                        <button type="submit">CADASTRAR</button>
                    </div>
                </form>
            </div>
            <div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
            </div>
        </div>
    )
}