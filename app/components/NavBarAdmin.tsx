"use client"

import { useRouter } from "next/navigation";
import "../css/styleNavbar.css"
import Swal from "sweetalert2";
import Link from "next/link";

export default function NavBarAdmin() {
    const router = useRouter();
    
    function sair() {
        Swal.fire({
            title: "Sair da conta?",
            text: "Sua sessão atual será encerrada",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, sair",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#ca0101",
            cancelButtonColor: "#9ca4af",
            color: "#e6e6e6",
            background: "#211d1d",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("usuario");
                localStorage.removeItem("sessaoExpira");
                router.push("/");
            }
        });
    }

    return(
        <nav>
            <div className="imagem">
                <img src="/logo-sesi.png"/>
            </div>
            <div className="acoes">
                <Link href="/dashboardadmin/sala/cadastro">Cadastrar Sala</Link>
                <Link href="/dashboardadmin/patrimonio/cadastro">Cadastrar Patrimônio</Link>
                <Link href="/dashboardadmin/movimentacao/cadastro">Cadastrar Movimentação</Link>
                <Link href="/dashboardadmin">Movimentações</Link>
                <Link href="/dashboardadmin/patrimonio">Patrimônios</Link>
                <Link href="/perfil">Perfil</Link>
                <button onClick={sair}>Sair</button>
            </div>
        </nav>
    )
}