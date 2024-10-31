import Link from "next/link";

export default function NotFound() {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-5">
            <h1 className="text-4xl font-bold mb-4 text-center">404 : Not Found</h1>
            <p className="text-lg text-center max-w-md">
                Ops! Algum erro inesperado aconteceu. Verifique o URL ou volte para a página inicial.
            </p>
            <Link href="/" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Voltar para a página inicial
            </Link>
        </div>
    );
}
