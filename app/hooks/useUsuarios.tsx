'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Usuario } from '@/app/types/Usuario';
import Swal from 'sweetalert2';

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(false);

    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }

        return error.message || mensagemPadrao;
    };

    const listarUsuarios = useCallback(async () => {
        setLoading(true);

        try {
            const resposta = await api.get('/usuario');
            setUsuarios(resposta.data);
        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: extrairErro(error, "Erro ao buscar usuários"),
                icon: 'error',
                color: "#e6e6e6",
                confirmButtonColor: '#ca0101',
                background: "#211d1d",
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const excluir = async (id: number) => {
        const confirmacao = await Swal.fire({
            title: 'Excluir usuário?',
            text: "Esta ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
            color: "#e6e6e6",
            confirmButtonColor: '#ca0101',
            background: "#211d1d",
        });

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/usuario/${id}`);

                Swal.fire(
                    'Excluído!',
                    'O usuário foi removido.',
                    'success'
                );
                listarUsuarios();

            } catch (error: any) {
                Swal.fire({
                    title: 'Erro!',
                    text: extrairErro(error, "Erro ao excluir"),
                    icon: 'error',
                    color: "#e6e6e6",
                    confirmButtonColor: '#ca0101',
                    background: "#211d1d",
                });
            }
        }
    };

    return {
        usuarios,
        loading,
        listarUsuarios,
        excluir
    };
}