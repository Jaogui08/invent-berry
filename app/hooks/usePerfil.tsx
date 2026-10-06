'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api';
import Swal from 'sweetalert2';

export function usePerfil() {
    const router = useRouter();

    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [nome, setNome] = useState('');
    const [nomeOriginal, setNomeOriginal] = useState('');
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipo, setTipo] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        carregarPerfil();
    }, []);

    const carregarPerfil = async () => {
        try {
            const usuarioSalvo = localStorage.getItem('usuario');

            if (!usuarioSalvo) {
                router.replace('/');
                return;
            }

            const usuario = JSON.parse(usuarioSalvo);

            setUsuarioId(usuario.id);
            setTipo(usuario.tipo);

            const resposta = await api.get(
                `/perfil/${usuario.id}`
            );

            setNome(resposta.data.nome);
            setNomeOriginal(resposta.data.nome);
            setEmail(resposta.data.email);

        } catch (error: any) {

            Swal.fire({
                title: 'Erro!',
                text:
                    error.response?.data?.erro ||
                    'Não foi possível carregar o perfil.',
                icon: 'error',
                color: '#e6e6e6',
                confirmButtonColor: '#ca0101',
                background: '#211d1d'
            });

        } finally {
            setCarregando(false);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usuarioId)
            return;

        if (novaSenha !== confirmarSenha) {
            Swal.fire({
                title: 'Erro!',
                text: 'As senhas não coincidem.',
                icon: 'error',
                color: '#e6e6e6',
                confirmButtonColor: '#ca0101',
                background: '#211d1d'
            });

            return;
        }

        setSalvando(true);

        try {

            const resposta = await api.put(
                `/perfil/${usuarioId}`,
                {
                    nome,
                    novaSenha
                }
            );

            const usuarioAtualizado = resposta.data;

            localStorage.setItem(
                'usuario',
                JSON.stringify(usuarioAtualizado)
            );

            setNome(usuarioAtualizado.nome);
            setNomeOriginal(usuarioAtualizado.nome);
            setEmail(usuarioAtualizado.email);
            setNovaSenha('');
            setConfirmarSenha('');

            Swal.fire({
                title: 'Sucesso!',
                text: 'Perfil atualizado com sucesso.',
                icon: 'success',
                color: '#e6e6e6',
                confirmButtonColor: '#ca0101',
                background: '#211d1d'
            });

            

        } catch (error: any) {

            Swal.fire({
                title: 'Erro!',
                text:
                    error.response?.data?.erro ||
                    'Não foi possível atualizar o perfil.',
                icon: 'error',
                color: '#e6e6e6',
                confirmButtonColor: '#ca0101',
                background: '#211d1d'
            });

        } finally {
            setSalvando(false);
        }
    };

    const senhasIguais = novaSenha === confirmarSenha;

    const possuiAlteracoes =
        nome !== nomeOriginal ||
        novaSenha.length > 0;

    return {
        nome,
        setNome,
        email,
        novaSenha,
        setNovaSenha,
        confirmarSenha,
        setConfirmarSenha,
        tipo,
        carregando,
        salvando,
        possuiAlteracoes,
        senhasIguais,
        salvar
    };
}