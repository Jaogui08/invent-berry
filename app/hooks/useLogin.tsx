'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function useLogin() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [entrando, setEntrando] = useState(false);

    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }

        return error.message || mensagemPadrao;
    };

    const entrar = async (e: React.FormEvent) => {
        e.preventDefault();
        setEntrando(true);

        try {
            const resposta = await api.post('/login', {
                email,
                senha
            });

            const usuario = resposta.data;

            const tempoSessao = 20 * 60 * 60 * 1000;

            const expira = Date.now() + tempoSessao;

            localStorage.setItem('usuario', JSON.stringify(usuario));

            localStorage.setItem('sessaoExpira', String(expira));

            if (usuario.tipo === 'adm') {
                router.push('/dashboardadmin');
            } else {
                router.push('/dashboard');
            }
        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: extrairErro(
                    error,
                    'E-mail ou senha incorretos.'
                ),
                icon: 'error',
                color: "#e6e6e6",
                confirmButtonColor: '#ca0101',
                background: "#211d1d",
            });
        } finally {
            setEntrando(false);
        }
    };

    return {
        email,
        setEmail,
        senha,
        setSenha,
        entrando,
        entrar
    };
}