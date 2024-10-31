import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Checkpoint } from "@/types/checkpoint";

//READ
export async function GET(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-cp.json', 'utf-8');
        
        const checkpoints:Checkpoint[] = JSON.parse(file);

        const checkpoint = checkpoints.find( p => p.id ==  params.id);

        return NextResponse.json(checkpoint);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção do checkpoint : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-cp.json', 'utf-8');
        
        const checkpoints:Checkpoint[] = JSON.parse(file);

        const indice = checkpoints.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            checkpoints.splice(indice,1);
            
            const listaJson = JSON.stringify(checkpoints);

            await fs.writeFile(process.cwd() + '/src/data/banco-cp.json', listaJson);

            return NextResponse.json({msg:"Checkpoint excluído com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão do Checkpoint : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-cp.json', 'utf-8');

        const checkpoints: Checkpoint[] = JSON.parse(file);

        const {aluno,materia,nota,data,feedback} = await request.json();

        const indice = checkpoints.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            const checkpoint = {aluno,materia,nota,data,feedback} as Checkpoint;

            checkpoint.id = params.id;

            checkpoints.splice(indice,1,checkpoint);
                        
            const listaJson = JSON.stringify(checkpoints);

            await fs.writeFile(process.cwd() + '/src/data/banco-cp.json', listaJson);

            return NextResponse.json({msg:"Checkpoint atualizado com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização do checkpoint : " + error }, { status: 500 });
    }

}