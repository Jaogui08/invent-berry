'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { time } from 'console';

export function useProtecaoRota(tipoPermitido: 'adm' | 'usuario'| 'qualquer') {
    const router = useRouter();

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');

        const sessaoExpira = localStorage.getItem('sessaoExpira');

        if (!usuarioSalvo || !sessaoExpira) {
            localStorage.removeItem('usuario');
            localStorage.removeItem('sessaoExpira');

            router.replace('/');
            return;
        }
        try {

            const usuario = JSON.parse(usuarioSalvo);

            const expiracao = Number(sessaoExpira);

            const dateNow = Date.now();

            if (!expiracao || dateNow >= expiracao) {
                localStorage.removeItem('usuario');
                localStorage.removeItem('sessaoExpira');

                router.replace('/');
                return;
            }

            if (!usuario.tipo) {
                localStorage.removeItem('usuario');
                localStorage.removeItem('sessaoExpira');

                router.replace('/');
                return;
            }

            if (
                tipoPermitido === 'adm' &&
                usuario.tipo !== 'adm'
            ) {
                router.replace('/dashboard');
                return;
            }

            if (
                tipoPermitido === 'usuario' &&
                usuario.tipo === 'adm'
            ) {
                router.replace('/dashboardadmin');
                return;
            }

            setCarregando(false);

            const tempoRestante = expiracao - dateNow;
            const timer = setTimeout(() => {
                localStorage.removeItem('usuario');
                localStorage.removeItem('sessaoExpira');

                router.replace('/');
            }, tempoRestante);

            return () => clearTimeout(timer);

        } catch {
            localStorage.removeItem('usuario');
            localStorage.removeItem('sessaoExpira');
            
            router.replace('/');
        }

    }, [router, tipoPermitido]);

    return {
        carregando
    };
}