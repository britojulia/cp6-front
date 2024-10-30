"use client"

import { Challenge } from "@/types/challenge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Challenges() {

    const [challenges, setChallenges] = useState<Challenge[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:3000/api/base-challange");
        const data = await response.json();
        
        setChallenges(data);
    }

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/base-challange/${id}`,{
            method: 'DELETE',
        });
        if (response.ok) {
            alert("Challenge excluído com sucesso.");
            chamadaApi();
        }
} catch (error) {
    console.error("Falha ao remover o challenge: ", error);
}
}

    return (
        <div>
            <div>
            <h2>Challenge</h2>
            <h3>avaliações </h3>
            <div>
                <nav>
                    <ul>
                        <li><Link href="/challange/cad-challenge">Cadastrar novo CH</Link></li>
                    </ul>
                </nav>
            </div>
            </div>

            <table className="tabelaProd">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ALUNO</th>
                        <th>MATERIA</th>
                        <th>NOTA</th>
                        <th>DATA</th>
                        <th>FEEDBACK</th>
                        <th>EDITAR | EXCLUIR</th>
                    </tr>
                </thead>
                <tbody>
                    {challenges.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.aluno}</td>
                            <td>{p.materia}</td>
                            <td>{p.nota}</td>
                            <td>{p.data}</td>
                            <td>{p.feedback}</td>
                    <td><Link href={`/challenge/${p.id}`}><Editar className="inline text-3xl"/></Link> | 
                        <Link href="#" onClick={()=> handleDelete(p.id)}> <Excluir className="inline text-3xl"/></Link> </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de challenges já realizadas : {challenges.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}