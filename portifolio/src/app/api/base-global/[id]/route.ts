import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { GlobalSolution } from "@/types/global";

//READ
export async function GET(request:Request, {params}:{params:{id:number}}) {

    //Criar um try-catch para tratar as possíves exceções que podem ocorrer.
    try {
        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile( process.cwd() + '/src/data/banco-gs.json', 'utf-8');
        
        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const globals:GlobalSolution[] = JSON.parse(file);

        //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const global = globals.find( p => p.id ==  params.id);

        //Agora podemos retornar o response com o produto encontrado em formato JSON para quem chamou.
        return NextResponse.json(global);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção da GS : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    //Criar um try-catch para tratar as possíves exceções que podem ocorrer.
    try {
        //Recuperando a lista que está no arquivo banco-gs.json e colocando na constante file.
        const file = await fs.readFile( process.cwd() + '/src/data/banco-gs.json', 'utf-8');
        
        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const globals:GlobalSolution[] = JSON.parse(file);

        //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const indice = globals.findIndex( p => p.id ==  params.id);

        //Verificando o índice encontrado se é válido:
        if(indice != -1){
            //Utilizando o método slice para remover a posição e o conteúdo da lista através do índice passado.
            globals.splice(indice,1);
            
            //Convertendo a lista em json-string para colocar de volta no arquivo:
            const listaJson = JSON.stringify(globals);

            //Finalmente adicionamos a lista no arquivo com os dados novos, sobrepondo os antigos.
            await fs.writeFile(process.cwd() + '/src/data/banco-gs.json', listaJson);

            //Criando uma resposta adequada para quem chamou:
            return NextResponse.json({msg:"GS excluída com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão da GS : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        //Recuperando a lista que está no arquivo banco-gs.json e colocando na constante file.
        const file = await fs.readFile(process.cwd() + '/src/data/banco-gs.json', 'utf-8');

        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const globals: GlobalSolution[] = JSON.parse(file);

        //Recebendo os dados através do request e armazenando em um objeto Tipado.
        // const produto: TipoProduto = await request.json();
        const {aluno,materia,nota,data,feedback} = await request.json();

       //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const indice = globals.findIndex( p => p.id ==  params.id);

         //Verificando o índice encontrado se é válido:
        if(indice != -1){
            //Tipando o novo objeto produto:
            const global = {aluno,materia,nota,data,feedback} as GlobalSolution;

            //inserindo o ID no produto confirmado
            global.id = params.id;

            //Utilizando o método splice alterar o conteúdo da lista através do índice passado com um novo objeto.
            globals.splice(indice,1,global);
                        
            //Convertendo a lista em json-string para colocar de volta no arquivo:
            const listaJson = JSON.stringify(globals);

            //Finalmente adicionamos a lista no arquivo com os dados novos, sobrepondo os antigos.
            await fs.writeFile(process.cwd() + '/src/data/banco-gs.json', listaJson);

            //Criando uma resposta adequada para quem chamou:
            return NextResponse.json({msg:"GS atualizada com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização da GS: " + error }, { status: 500 });
    }

}