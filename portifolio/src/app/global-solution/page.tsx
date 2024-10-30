"use client"

import { GlobalSolution } from "@/types/global";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Global() {

    const [globals, setGlobals] = useState<GlobalSolution[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:3000/api/base-global");
        const data = await response.json();
        
        setGlobals(data);
    }

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/base-global/${id}`,{
            method: 'DELETE',
        });
        if (response.ok) {
            alert("Global Solution excluída com sucesso.");
            chamadaApi();
        }
} catch (error) {
    console.error("Falha ao remover a Global Solution: ", error);
}
}

    return (
        <div>
            <div>
            <h2>Global Solution</h2>
            <h3>avaliações </h3>
            <div>
                <nav>
                    <ul>
                        <li><Link href="/global-solution/cad-global">Cadastrar novo GS</Link></li>
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
                    {globals.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.aluno}</td>
                            <td>{p.materia}</td>
                            <td>{p.nota}</td>
                            <td>{p.data}</td>
                            <td>{p.feedback}</td>
                    <td><Link href={`/global-solution/${p.id}`}><Editar className="inline text-3xl"/></Link> | 
                        <Link href="#" onClick={()=> handleDelete(p.id)}> <Excluir className="inline text-3xl"/></Link> </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de global já realizadas : {globals.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}