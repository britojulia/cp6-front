import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { GlobalSolution } from "@/types/global";


//READ ALL
export async function GET() {

    //Criar um try-catch para tratar as possíves exceções que podem ocorrer.
    try {
        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile(process.cwd() + '/src/data/banco-gs.json', 'utf-8');

        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const globals:GlobalSolution[] = JSON.parse(file);

        //Agora podemos retornar o response com a lista em formato JSON para quem chamou.
        return NextResponse.json(globals);

    } catch (error) {
        return NextResponse.json({ error: "Falha na obtenção da lista de global solutions : " + error }, { status: 500 });
    }

}

//CREATE
export async function POST(request: Request) {

    try {

        //Recuperando a lista que está no arquivo banco-gs.json e colocando na constante file.
        const file = await fs.readFile(process.cwd() + '/src/data/banco-gs.json', 'utf-8');

        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const globals: GlobalSolution[] = JSON.parse(file);

        //Recebendo os dados através do request e armazenando em um objeto Tipado.
        // const produto: TipoProduto = await request.json();
        const {aluno, materia, nota, data, feedback} = await request.json();
        const checkpoint = {aluno, materia, nota, data, feedback} as GlobalSolution;

        //Criando a estratégia de gerar um novo ID através do último produto da lista
        const novoId = ( parseInt(globals[globals.length - 1].id.toString() ) + 1);

        //Utilizando o novo ID no produto gerado:
        checkpoint.id = novoId;

        //Inserindo o novo produto na lista:
        globals.push(checkpoint);

        //Convertendo a lista em json-string para colocar de volta no arquivo:
        const listaJson = JSON.stringify(globals);

        //Finalmente adicionamos a lista no arquivo com os dados novos, sobrepondo os antigos.
        await fs.writeFile(process.cwd() + '/src/data/banco-gs.json', listaJson);

        //Criando uma resposta adequada para quem chamou:
        return NextResponse.json(checkpoint, { status: 201 });

    } catch (error) {
        return  NextResponse.json({ error: "Falha na inserção da Global Solution: " + error }, { status: 500 });
    }

}