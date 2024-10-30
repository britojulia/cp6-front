import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Challenge } from "@/types/challenge";

//READ
export async function GET(request:Request, {params}:{params:{id:number}}) {

    //Criar um try-catch para tratar as possíves exceções que podem ocorrer.
    try {
        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile( process.cwd() + '/src/data/banco-ch.json', 'utf-8');
        
        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const challenges:Challenge[] = JSON.parse(file);

        //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const challenge = challenges.find( p => p.id ==  params.id);

        //Agora podemos retornar o response com o produto encontrado em formato JSON para quem chamou.
        return NextResponse.json(challenge);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção do challenge : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    //Criar um try-catch para tratar as possíves exceções que podem ocorrer.
    try {
        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile( process.cwd() + '/src/data/banco-ch.json', 'utf-8');
        
        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const challenges:Challenge[] = JSON.parse(file);

        //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const indice = challenges.findIndex( p => p.id ==  params.id);

        //Verificando o índice encontrado se é válido:
        if(indice != -1){
            //Utilizando o método slice para remover a posição e o conteúdo da lista através do índice passado.
            challenges.splice(indice,1);
            
            //Convertendo a lista em json-string para colocar de volta no arquivo:
            const listaJson = JSON.stringify(challenges);

            //Finalmente adicionamos a lista no arquivo com os dados novos, sobrepondo os antigos.
            await fs.writeFile(process.cwd() + '/src/data/banco-ch.json', listaJson);

            //Criando uma resposta adequada para quem chamou:
            return NextResponse.json({msg:"Challenge excluído com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão do Challenge : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        //Recuperando a lista que está no arquivo banco.json e colocando na constante file.
        const file = await fs.readFile(process.cwd() + '/src/data/banco-ch.json', 'utf-8');

        //Convertendo o conteúdo do arquivo file que está em formato string em um objeto JSON.
        //Obs estamos recuperando uma lista e não um único objeto, por isso é necessário a tipagem correta.
        const challenges: Challenge[] = JSON.parse(file);

        //Recebendo os dados através do request e armazenando em um objeto Tipado.
        // const produto: TipoProduto = await request.json();
        const {aluno,materia,nota,data,feedback} = await request.json();

       //Criar uma forma de pesquisa na lista para identificar o produto pelo ID:
        const indice = challenges.findIndex( p => p.id ==  params.id);

         //Verificando o índice encontrado se é válido:
        if(indice != -1){
            //Tipando o novo objeto produto:
            const challenge = {aluno,materia,nota,data,feedback} as Challenge;

            //inserindo o ID no produto confirmado
            challenge.id = params.id;

            //Utilizando o método splice alterar o conteúdo da lista através do índice passado com um novo objeto.
            challenges.splice(indice,1,challenge);
                        
            //Convertendo a lista em json-string para colocar de volta no arquivo:
            const listaJson = JSON.stringify(challenges);

            //Finalmente adicionamos a lista no arquivo com os dados novos, sobrepondo os antigos.
            await fs.writeFile(process.cwd() + '/src/data/banco-ch.json', listaJson);

            //Criando uma resposta adequada para quem chamou:
            return NextResponse.json({msg:"Challenge atualizado com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização do challenge : " + error }, { status: 500 });
    }

}