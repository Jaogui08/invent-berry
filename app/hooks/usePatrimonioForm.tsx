'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function usePatrimonioForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');

    const [nome, setNome] = useState('');
    const [numeroPatrimonio, setNumeroPatrimonio] = useState('');
    const [status, setStatus] = useState('');
    const [foto, setFoto] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        if (idParam) {
            buscarPatrimonioPorId(Number(idParam));
        }
    }, [idParam]);

    const buscarPatrimonioPorId = async (id: number) => {
        setCarregando(true);

        try {
            const resposta = await api.get(`/patrimonio/${id}`);
            const patrimonio = resposta.data;

            setEditandoId(patrimonio.id);
            setNome(patrimonio.nome);
            setNumeroPatrimonio(patrimonio.numeroPatrimonio);
            setStatus(patrimonio.status);
            setFoto(patrimonio.foto || '');

        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: error.response?.data?.erro || 'Erro ao buscar o patrimônio.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });

            router.push('/dashboardadmin/patrimonio');

        } finally {
            setCarregando(false);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !numeroPatrimonio) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos obrigatórios.',
                icon: 'warning',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });

            return;
        }

        if (editandoId !== null && !status) {
            await Swal.fire({
                title: 'Atenção!',
                text: 'Selecione o status do patrimônio.',
                icon: 'warning',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: '#211d1d',
            });

            return;
        }

        setSalvando(true);

        try {
            if (editandoId !== null) {
                const dados = {
                    nome,
                    numeroPatrimonio,
                    status,
                    foto: foto || null
                };

                await api.put(`/patrimonio/${editandoId}`, dados);
            } else {
                const dados = {
                    nome,
                    numeroPatrimonio,
                    foto: foto || null
                };

                await api.post(`/patrimonio`, dados);
            }

            await Swal.fire({
                title: 'Sucesso!',
                text: editandoId !== null
                    ? 'Patrimônio atualizado com sucesso!'
                    : 'Patrimônio cadastrado com sucesso!',
                icon: 'success',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });

            router.push('/dashboardadmin/patrimonio');

        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: error.response?.data?.erro || 'Erro ao salvar o patrimônio.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });

        } finally {
            setSalvando(false);
        }
    };

    const cancelar = () => {
        router.push('/dashboardadmin/patrimonio');
    };

    return {
        nome,
        setNome,
        numeroPatrimonio,
        setNumeroPatrimonio,
        status,
        setStatus,
        foto,
        setFoto,
        editandoId,
        carregando,
        salvando,
        salvar,
        cancelar
    };
}