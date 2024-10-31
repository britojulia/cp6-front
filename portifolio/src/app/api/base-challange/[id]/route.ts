import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Challenge } from "@/types/challenge";

//READ
export async function GET(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-ch.json', 'utf-8');
        
        const challenges:Challenge[] = JSON.parse(file);

        const challenge = challenges.find( p => p.id ==  params.id);

        return NextResponse.json(challenge);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção do challenge : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-ch.json', 'utf-8');
        
        const challenges:Challenge[] = JSON.parse(file);

        const indice = challenges.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            challenges.splice(indice,1);
            
            const listaJson = JSON.stringify(challenges);

            await fs.writeFile(process.cwd() + '/src/data/banco-ch.json', listaJson);

            return NextResponse.json({msg:"Challenge excluído com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão do Challenge : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-ch.json', 'utf-8');

        const challenges: Challenge[] = JSON.parse(file);

        const {aluno,materia,nota,data,feedback} = await request.json();

        const indice = challenges.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            const challenge = {aluno,materia,nota,data,feedback} as Challenge;

            challenge.id = params.id;

            challenges.splice(indice,1,challenge);
                        
            const listaJson = JSON.stringify(challenges);

            await fs.writeFile(process.cwd() + '/src/data/banco-ch.json', listaJson);

            return NextResponse.json({msg:"Challenge atualizado com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização do challenge : " + error }, { status: 500 });
    }

}