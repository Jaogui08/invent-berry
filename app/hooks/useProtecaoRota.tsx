'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useProtecaoRota(tipoPermitido: 'adm' | 'usuario') {
    const router = useRouter();

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');

        if (!usuarioSalvo) {
            router.replace('/');
            return;
        }
        try {

            const usuario = JSON.parse(usuarioSalvo);

            if (!usuario.tipo) {
                localStorage.removeItem('usuario');
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

        } catch {
            localStorage.removeItem('usuario');
            router.replace('/');
        }

    }, [router, tipoPermitido]);

    return {
        carregando
    };
}