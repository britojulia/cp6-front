import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { GlobalSolution } from "@/types/global";


//READ ALL
export async function GET() {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/banco-gs.json', 'utf-8');

        const globals:GlobalSolution[] = JSON.parse(file);

        return NextResponse.json(globals);

    } catch (error) {
        return NextResponse.json({ error: "Falha na obtenção da lista de global solutions : " + error }, { status: 500 });
    }

}

//CREATE
export async function POST(request: Request) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-gs.json', 'utf-8');

        const globals: GlobalSolution[] = JSON.parse(file);

        const {aluno, materia, nota, data, feedback} = await request.json();
        const checkpoint = {aluno, materia, nota, data, feedback} as GlobalSolution;

        const novoId = ( parseInt(globals[globals.length - 1].id.toString() ) + 1);

        checkpoint.id = novoId;

        globals.push(checkpoint);

        const listaJson = JSON.stringify(globals);

        await fs.writeFile(process.cwd() + '/src/data/banco-gs.json', listaJson);

        return NextResponse.json(checkpoint, { status: 201 });

    } catch (error) {
        return  NextResponse.json({ error: "Falha na inserção da Global Solution: " + error }, { status: 500 });
    }

}