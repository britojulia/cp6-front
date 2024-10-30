"use client"

import { Checkpoint } from "@/types/checkpoint";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";

export default function Checkpoints() {

    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    
    const chamadaApi = async ()=>{
        const response = await fetch("http://localhost:3000/api/base-checkpoint");
        const data = await response.json();
        
        setCheckpoints(data);
    }

    useEffect(() => {
        chamadaApi();
    }, [])

const handleDelete = async (id:number)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/base-checkpoint/${id}`,{
            method: 'DELETE',
        });
        if (response.ok) {
            alert("Checkpoint excluído com sucesso.");
            chamadaApi();
        }
} catch (error) {
    console.error("Falha ao remover o checkpoint: ", error);
}
}

    return (
        <div>
            <h2>Checkpoints</h2>
            <h3>avaliações </h3>

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
                    {checkpoints.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.aluno}</td>
                            <td>{p.materia}</td>
                            <td>{p.nota}</td>
                            <td>{p.data}</td>
                            <td>{p.feedback}</td>
                    <td><Link href={`/checkpoint/${p.id}`}><Editar className="inline text-3xl"/></Link> | 
                        <Link href="#" onClick={()=> handleDelete(p.id)}> <Excluir className="inline text-3xl"/></Link> </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            Quantidade de checkpoints já realizadas : {checkpoints.length}
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}