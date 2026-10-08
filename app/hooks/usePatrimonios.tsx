'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function usePatrimonios() {
    const router = useRouter();

    const [patrimonios, setPatrimonios] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        listarPatrimonios();
    }, []);


    const listarPatrimonios = async () => {

        setCarregando(true);

        try {

            const resposta = await api.get('/patrimonio');

            setPatrimonios(resposta.data);

        } catch (error: any) {

            Swal.fire({
                title: 'Erro!',
                text:
                    error.response?.data?.erro ||
                    'Erro ao buscar os patrimônios.',
                icon: 'error',
                confirmButtonColor: '#ca0101'
            });

        } finally {

            setCarregando(false);

        }
    };

    const editar = (id: number) => {

        router.push(
            `/dashboardadmin/patrimonio/cadastro?id=${id}`
        );

    };

    const excluir = async (id: number) => {

        const resultado = await Swal.fire({
            title: 'Excluir patrimônio?',
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

            await api.delete(`/patrimonio/${id}`);

            await Swal.fire({
                title: 'Excluído!',
                text: 'Patrimônio excluído com sucesso.',
                icon: 'success',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });

            listarPatrimonios();

        } catch (error: any) {

            const possuiMovimentacoes = error.response?.data?.possuiMovimentacoes;

            if (possuiMovimentacoes) {
                const confirmarExclusao = await Swal.fire({
                    title: "Excluir mesmo assim?",
                    text:
                        "Este patrimônio possui movimentações registradas. " +
                        "Ao continuar, todas as movimentações relacionadas " +
                        "a ele também serão excluídas permanentemente.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Excluir mesmo assim",
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "#ca0101",
                    cancelButtonColor: "#6b7280",
                    color: "#e6e6e6",
                    background: "#211d1d",
                    reverseButtons: true,
                });

                if (!confirmarExclusao.isConfirmed) {
                    return;
                }

                try {
                    await api.delete(
                        `/patrimonio/${id}?forcar=true`
                    );

                    await Swal.fire({
                        title: "Excluído!",
                        text: "O patrimônio e suas movimentações foram excluídos.",
                        icon: "success",
                        confirmButtonColor: "#ca0101",
                        color: "#e6e6e6",
                        background: "#211d1d",
                    });

                    listarPatrimonios();
                } catch (error: any) {
                    Swal.fire({
                        title: "Erro!",
                        text: error.response?.data?.erro || "Erro ao excluir o patrimônio",
                        icon: "error",
                        confirmButtonColor: "#ca0101",
                        color: "#e6e6e6",
                        background: "#211d1d",
                    });
                }

                return;
            }

            Swal.fire({
                title: 'Erro!',
                text:
                    error.response?.data?.erro ||
                    'Erro ao excluir o patrimônio.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });
        }
    };

    return {
        patrimonios,
        carregando,
        editar,
        excluir,
        listarPatrimonios
    };
}