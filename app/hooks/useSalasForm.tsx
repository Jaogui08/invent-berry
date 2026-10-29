'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function useSalasForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');
    const [nome, setNome] = useState('');
    const [leitorId, setLeitorId] = useState('');
    const [
        editandoId,
        setEditandoId
    ] = useState<number | null>(null);

    const [
        carregando,
        setCarregando
    ] = useState(false);

    const [
        salvando,
        setSalvando
    ] = useState(false);

    useEffect(() => {

        if (idParam) {

            buscarSalaPorId(
                Number(idParam)
            );
        }

    }, [idParam]);

    const buscarSalaPorId =
        async (id: number) => {

        setCarregando(true);

        try {

            const resposta =
                await api.get(
                    `/sala/${id}`
                );

            const sala =
                resposta.data;

            setEditandoId(sala.id);
            setNome(sala.nome);
            setLeitorId(sala.leitorId || '');

        } catch (error: any) {
            await Swal.fire({
                title: 'Erro!',
                text:
                    error.response
                        ?.data?.erro ||
                        'Erro ao buscar a sala.',
                icon: 'error',
                confirmButtonColor:'#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });

            router.push(
                '/dashboardadmin/sala'
            );

        } finally {
            setCarregando(false);
        }
    };

    const salvar =
        async (
            e: React.FormEvent
        ) => {

        e.preventDefault();

        if (!nome || !leitorId) {
            await Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos.',
                icon: 'warning',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });

            return;
        }

        setSalvando(true);

        try {

            const dados = {
                nome,
                leitorId
            };

            if (
                editandoId !== null
            ) {

                await api.put(
                    `/sala/${editandoId}`,
                    dados
                );

            } else {

                await api.post(
                    '/sala',
                    dados
                );
            }

            await Swal.fire({
                title: 'Sucesso!',
                text:
                    editandoId !== null
                        ? 'Sala atualizada com sucesso!'
                        : 'Sala cadastrada com sucesso!',
                icon: 'success',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });

            router.push(
                '/dashboardadmin/sala'
            );

        } catch (error: any) {

            await Swal.fire({
                title: 'Erro!',
                text: error.response ?.data?.erro || 'Erro ao salvar a sala.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d'
            });

        } finally {
            setSalvando(false);
        }
    };

    const cancelar = () => {

        router.push(
            '/dashboardadmin/sala'
        );
    };

    return {
        nome,
        setNome,
        leitorId,
        setLeitorId,
        editandoId,
        carregando,
        salvando,
        salvar,
        cancelar
    };
}