import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Challenge } from "@/types/challenge";


//READ ALL
export async function GET() {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/banco-ch.json', 'utf-8');

        const challenges:Challenge[] = JSON.parse(file);

        return NextResponse.json(challenges);

    } catch (error) {
        return NextResponse.json({ error: "Falha na obtenção da lista de challenges : " + error }, { status: 500 });
    }

}

//CREATE
export async function POST(request: Request) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-ch.json', 'utf-8');

        const challenges: Challenge[] = JSON.parse(file);

        const {aluno, materia, nota, data, feedback} = await request.json();
        const challenge = {aluno, materia, nota, data, feedback} as Challenge;

        const novoId = ( parseInt(challenges[challenges.length - 1].id.toString() ) + 1);

        challenge.id = novoId;

        challenges.push(challenge);

        const listaJson = JSON.stringify(challenges);

        await fs.writeFile(process.cwd() + '/src/data/banco-ch.json', listaJson);

        return NextResponse.json(challenge, { status: 201 });

    } catch (error) {
        return  NextResponse.json({ error: "Falha na inserção do challenge : " + error }, { status: 500 });
    }

}