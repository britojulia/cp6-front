"use client"

import { Challenge } from "@/types/challenge";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CadChallenge() {
    const navigate = useRouter();

    const [challenge, setChallenge] = useState<Challenge>({
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
        setChallenge({...challenge, [name]:value});
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const  response = await fetch('http://localhost:3000/api/base-challange', {
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
                        aluno:"",
                        materia:"",
                        nota: 0.0,
                        data: "",
                        feedback:"",
                    });
                    navigate.push('/challenge');
                }
        } catch (error) {
            console.error("Falha ao cadastrar challenge: ", error);
        }
    }

    return (
        <div>
            <h1>Challenges</h1>
            <div>
            <label htmlFor="idChallenge"> Challenge </label>
                <form onSubmit={handleSubmit}>
                    <h2>Adicionar Challange</h2>
                    <div>
                        <label>NOME DO ALUNO</label>
                        <input type="text" name="aluno" value={challenge.aluno} onChange={(evento)=>handleChange(evento)} placeholder="digite o nome do aluno" required/>
                    </div>
                    <div>
                        <label>NOME DA AVALIAÇÃO</label>
                        <input type="text" name="materia" value={challenge.materia} onChange={(evento)=>handleChange(evento)} placeholder="digite a matéria da avaliação" required/>
                    </div>
                    <div>
                        <label>NOTA</label>
                        <input type="number" name="nota" value={challenge.nota} onChange={(evento)=>handleChange(evento)} placeholder="digite a nota da avaliação"/>
                    </div>
                    <div>
                        <label>DATA</label>
                        <input type="date" name="data" value={challenge.data} onChange={(evento)=>handleChange(evento)} required/>
                    </div>
                    <div>
                        <label>FEEDBACK</label>
                        <input type="text" name="feedback" value={challenge.feedback} onChange={(evento)=>handleChange(evento)} placeholder="digite o feedback da avaliação"/>
                    </div>
                    <div>
                        <button type="submit">CADASTRAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}