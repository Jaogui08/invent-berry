'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Sala } from '@/app/types/Sala';
import Swal from 'sweetalert2';

export function useSalas() {
    const [salas, setSalas] = useState<Sala[]>([]);
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

    const listarSalas = useCallback(async () => {
        setLoading(true);

        try {
            const resposta = await api.get('/sala');
            setSalas(resposta.data);
        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: extrairErro(error, "Erro ao buscar salas"),
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
            title: 'Excluir sala?',
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
                await api.delete(`/sala/${id}`);

                Swal.fire(
                    'Excluída!',
                    'A sala foi removida.',
                    'success'
                );

                listarSalas();

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
        salas,
        loading,
        listarSalas,
        excluir
    };
}