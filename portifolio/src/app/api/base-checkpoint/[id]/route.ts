import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Checkpoint } from "@/types/checkpoint";

//READ
export async function GET(request:Request, {params}:{params:{id:number}}) {

    //Criar um try-catch para tratar as possíves exceções que podem ocorrer.
    try {
        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile( process.cwd() + '/src/data/banco.json', 'utf-8');
        
        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const checkpoints:Checkpoint[] = JSON.parse(file);

        //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const checkpoint = checkpoints.find( p => p.id ==  params.id);

        //Agora podemos retornar o response com o produto encontrado em formato JSON para quem chamou.
        return NextResponse.json(checkpoint);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção do checkpoint : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    //Criar um try-catch para tratar as possíves exceções que podem ocorrer.
    try {
        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile( process.cwd() + '/src/data/banco.json', 'utf-8');
        
        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const checkpoints:Checkpoint[] = JSON.parse(file);

        //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const indice = checkpoints.findIndex( p => p.id ==  params.id);

        //Verificando o índice encontrado se é válido:
        if(indice != -1){
            //Utilizando o método slice para remover a posição e o conteúdo da lista através do índice passado.
            checkpoints.splice(indice,1);
            
            //Convertendo a lista em json-string para colocar de volta no arquivo:
            const listaJson = JSON.stringify(checkpoints);

            //Finalmente adicionamos a lista no arquivo com os dados novos, sobrepondo os antigos.
            await fs.writeFile(process.cwd() + '/src/data/banco.json', listaJson);

            //Criando uma resposta adequada para quem chamou:
            return NextResponse.json({msg:"Produto excluído com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão do produto : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile(process.cwd() + '/src/data/banco.json', 'utf-8');

        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const checkpoints: Checkpoint[] = JSON.parse(file);

        //Recebendo os dados através do request e armazenando em um objeto Tipado.
        // const produto: TipoProduto = await request.json();
        const {aluno,materia,nota,data,feedback} = await request.json();

       //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const indice = checkpoints.findIndex( p => p.id ==  params.id);

         //Verificando o índice encontrado se é válido:
        if(indice != -1){
            //Tipando o novo objeto produto:
            const checkpoint = {aluno,materia,nota,data,feedback} as Checkpoint;

            //inserindo o ID no produto confirmado
            checkpoint.id = params.id;

            //Utilizando o método splice alterar o conteúdo da lista através do índice passado com um novo objeto.
            checkpoints.splice(indice,1,checkpoint);
                        
            //Convertendo a lista em json-string para colocar de volta no arquivo:
            const listaJson = JSON.stringify(checkpoints);

            //Finalmente adicionamos a lista no arquivo com os dados novos, sobrepondo os antigos.
            await fs.writeFile(process.cwd() + '/src/data/banco.json', listaJson);

            //Criando uma resposta adequada para quem chamou:
            return NextResponse.json({msg:"Checkpoint atualizado com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização do checkpoint : " + error }, { status: 500 });
    }

}