'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';
import { Sala } from '@/app/types/Sala';

export function useSalas() {

    const router = useRouter();

    const [salas, setSalas] =
        useState<Sala[]>([]);

    const [carregando, setCarregando] =
        useState(true);

    useEffect(() => {
        listarSalas();
    }, []);

    const listarSalas = async () => {

        setCarregando(true);

        try {

            const resposta =
                await api.get('/sala');

            setSalas(
                resposta.data
            );

        } catch (error: any) {

            Swal.fire({
                title: 'Erro!',
                text: error.response?.data?.erro || 'Erro ao buscar as salas.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });

        } finally {

            setCarregando(false);
        }
    };

    const editar = (id: number) => {

        router.push(
            `/dashboardadmin/sala/cadastro?id=${id}`
        );
    };

    const excluir = async (id: number) => {

        const resultado =
            await Swal.fire({
                title: 'Excluir sala?',
                text: 'Essa ação não poderá ser desfeita.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#ca0101',
                cancelButtonColor: '#6b7280',
                color: '#e6e6e6',
                background: '#211d1d',
                reverseButtons: true
            });

        if (!resultado.isConfirmed) {
            return;
        }

        try {

            await api.delete(
                `/sala/${id}`
            );

            await Swal.fire({
                title: 'Excluída!',
                text: 'Sala excluída com sucesso.',
                icon: 'success',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });

            listarSalas();

        } catch (error: any) {

            Swal.fire({
                title: 'Não foi possível excluir',
                text: error.response?.data?.erro || 'Erro ao excluir a sala.',
                icon: 'warning',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });
        }
    };

    return {
        salas,
        carregando,
        listarSalas,
        editar,
        excluir
    };
}