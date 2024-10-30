
import Link from 'next/link';

export default function InternalError() {
return (
    <div>
        <h1>500 - Erro Interno do Servidor</h1>
        <p>Desculpe, algo deu errado no servidor. Tente novamente mais tarde.</p>
        <Link href="/">Voltar para a página inicial</Link>
    </div>
);
}
