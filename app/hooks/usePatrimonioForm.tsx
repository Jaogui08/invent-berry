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
    const [rfid, setRfid] = useState('');
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
            setRfid(patrimonio.rfid || '');
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

        if (!nome || !numeroPatrimonio || !status) {
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

        setSalvando(true);
        
        try {
            const dados = {
                nome,
                numeroPatrimonio,
                rfid: rfid || null,
                status,
                foto: foto || null
            };

            if (editandoId) {
                await api.put(`/patrimonio/${editandoId}`, dados);
            } else {
                await api.post('/patrimonio', dados);
            }

            await Swal.fire({
                title: 'Sucesso!',
                text: editandoId
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
        rfid,
        setRfid,
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