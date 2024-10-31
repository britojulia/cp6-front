import Link from 'next/link';

export default function InternalError() {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white text-center p-5">
            <h1 className="text-5xl font-bold mb-4">500 - Erro Interno do Servidor</h1>
            <p className="text-xl mb-6 max-w-md">
                Desculpe, algo deu errado no servidor. Tente novamente mais tarde.
            </p>
            <Link href="/" className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition">
                Voltar para a página inicial
            </Link>
        </div>
    );
}
