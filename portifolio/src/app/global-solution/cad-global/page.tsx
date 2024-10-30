"use client"

import { GlobalSolution } from "@/types/global";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CadGlobalSolution() {
    const navigate = useRouter();

    const [global, setGlobal] = useState<GlobalSolution>({
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
        setGlobal({...global, [name]:value});
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const  response = await fetch('http://localhost:3000/api/base-global', {
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
                        aluno:"",
                        materia:"",
                        nota: 0.0,
                        data: "",
                        feedback:"",
                    });
                    navigate.push('/global-solution');
                }
        } catch (error) {
            console.error("Falha ao cadastrar global solution: ", error);
        }
    }

    return (
        <div>
            <h1>Global Solutions</h1>
            <div>
            <label htmlFor="idProduto"> Global Solution </label>
                <form onSubmit={handleSubmit}>
                    <h2>Adicionar GS</h2>
                    <div>
                        <label>NOME DO ALUNO</label>
                        <input type="text" name="aluno" value={global.aluno} onChange={(evento)=>handleChange(evento)} placeholder="digite o nome do aluno" required/>
                    </div>
                    <div>
                        <label>NOME DA AVALIAÇÃO</label>
                        <input type="text" name="materia" value={global.materia} onChange={(evento)=>handleChange(evento)} placeholder="digite a matéria da avaliação" required/>
                    </div>
                    <div>
                        <label>NOTA</label>
                        <input type="number" name="nota" value={global.nota} onChange={(evento)=>handleChange(evento)} placeholder="digite a nota da avaliação"/>
                    </div>
                    <div>
                        <label>DATA</label>
                        <input type="date" name="data" value={global.data} onChange={(evento)=>handleChange(evento)} required/>
                    </div>
                    <div>
                        <label>FEEDBACK</label>
                        <input type="text" name="feedback" value={global.feedback} onChange={(evento)=>handleChange(evento)} placeholder="digite o feedback da avaliação"/>
                    </div>
                    <div>
                        <button type="submit">CADASTRAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}