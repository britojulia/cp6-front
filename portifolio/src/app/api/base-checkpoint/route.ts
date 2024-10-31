import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Checkpoint } from "@/types/checkpoint";


//READ ALL
export async function GET() {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/banco-cp.json', 'utf-8');

        const checkpoints:Checkpoint[] = JSON.parse(file);

        return NextResponse.json(checkpoints);

    } catch (error) {
        return NextResponse.json({ error: "Falha na obtenção da lista de checkpoints : " + error }, { status: 500 });
    }

}

//CREATE
export async function POST(request: Request) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-cp.json', 'utf-8');

        const checkpoints: Checkpoint[] = JSON.parse(file);

        const {aluno, materia, nota, data, feedback} = await request.json();
        const checkpoint = {aluno, materia, nota, data, feedback} as Checkpoint;

        const novoId = ( parseInt(checkpoints[checkpoints.length - 1].id.toString() ) + 1);

        checkpoint.id = novoId;

        checkpoints.push(checkpoint);

        const listaJson = JSON.stringify(checkpoints);

        await fs.writeFile(process.cwd() + '/src/data/banco-cp.json', listaJson);

        return NextResponse.json(checkpoint, { status: 201 });

    } catch (error) {
        return  NextResponse.json({ error: "Falha na inserção do checkpoint : " + error }, { status: 500 });
    }

}