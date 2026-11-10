"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/app/lib/api";

export default function PerfilNavLink() {

    const [foto, setFoto] = useState<string | null>(null);
    const [carregandoFoto, setCarregandoFoto] = useState(true);

    useEffect(() => {

        let componenteAtivo = true;

        const carregarFoto = async () => {

            try {

                const usuarioSalvo = localStorage.getItem("usuario");

                if (!usuarioSalvo) {
                    setFoto(null);
                    return;
                }

                const usuario = JSON.parse(usuarioSalvo);

                if (!usuario.id) {
                    setFoto(null);
                    return;
                }

                const resposta = await api.get(
                    `/perfil/${usuario.id}`
                );

                if (componenteAtivo) {
                    setFoto(resposta.data.foto || null);
                }

            } catch (error) {

                if (componenteAtivo) {
                    setFoto(null);
                }

            } finally {

                if (componenteAtivo) {
                    setCarregandoFoto(false);
                }
            }
        };

        const atualizarFoto = (evento: Event) => {

            const eventoFoto = evento as CustomEvent<{foto: string | null}>;

            setFoto(eventoFoto.detail?.foto ?? null);
            setCarregandoFoto(false);
        };

        carregarFoto();

        window.addEventListener("fotoPerfilAtualizada", atualizarFoto);

        return () => {

            componenteAtivo = false;

            window.removeEventListener("fotoPerfilAtualizada", atualizarFoto);

        };

    }, []);

    return (

        <Link
            href="/perfil"
            className="link-perfil"
        >

            {carregandoFoto ? (

                <span className="foto-perfil-navbar-loading" />

            ) : foto ? (
                <img src={foto} className="foto-perfil-navbar"/>
            ) : (
                <img src="/foto-default.png" className="foto-perfil-navbar"/>
            )}

        </Link>
    );
}