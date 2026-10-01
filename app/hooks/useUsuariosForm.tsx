'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function useUsuarioForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('');

    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }

        return error.message || mensagemPadrao;
    };

    useEffect(() => {
        if (idParam) {
            buscarUsuarioPorId(Number(idParam));
        }
    }, [idParam]);

    const buscarUsuarioPorId = async (id: number) => {
        setCarregando(true);

        try {
            const resposta = await api.get(`/usuario/${id}`);
            const usuario = resposta.data;

            setEditandoId(usuario.id!);
            setNome(String(usuario.nome));
            setEmail(String(usuario.email));
            setSenha('');
            setTipo(String(usuario.tipo));

        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: extrairErro(
                    error,
                    "Erro ao buscar os detalhes do usuário."
                ),
                icon: 'error',
                color: "#e6e6e6",
                confirmButtonColor: '#ca0101',
                background: "#211d1d",
            });

            router.push('/');

        } finally {
            setCarregando(false);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        setSalvando(true);

        try {
            if (editandoId) {
                const dados = {
                    nome,
                    email,
                    senha,
                    tipo
                };

                await api.put(`/usuario/${editandoId}`, dados);
            } else {
                const dados = {
                    nome,
                    email,
                    senha
                };

                await api.post('/usuario', dados);
            }

            await Swal.fire({
                title: 'Sucesso!',
                text: 'Usuário salvo com sucesso!',
                icon: 'success',
                color: "#e6e6e6",
                confirmButtonColor: '#ca0101',
                background: "#211d1d",
            });

            router.push('/');

        } catch (error: any) {
            Swal.fire({
                title: 'Atenção!',
                text: extrairErro(
                    error,
                    "Erro ao salvar o usuário."
                ),
                icon: 'warning',
                color: "#e6e6e6",
                confirmButtonColor: '#ca0101',
                background: "#211d1d",
            });

        } finally {
            setSalvando(false);
        }
    };

    const cancelar = () => {
        router.push('/');
    };

    return {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        tipo,
        setTipo,
        editandoId,
        carregando,
        salvando,
        salvar,
        cancelar
    };
}