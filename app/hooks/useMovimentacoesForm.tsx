'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function useMovimentacaoForm() {
    const router = useRouter();

    const [patrimonioId, setPatrimonioId] = useState('');
    const [salaId, setSalaId] = useState('');
    const [tipo, setTipo] = useState('');
    const [patrimonios, setPatrimonios] = useState<any[]>([]);
    const [salas, setSalas] = useState<any[]>([]);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        buscarPatrimonios();
        buscarSalas();
    }, []);

    const buscarPatrimonios = async () => {
        try {
            const resposta = await api.get('/patrimonio');

            setPatrimonios(resposta.data);

        } catch (error: any) {

            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao buscar os patrimônios.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });
        }
    };

    const buscarSalas = async () => {
        try {
            const resposta = await api.get('/sala');

            setSalas(resposta.data);

        } catch (error: any) {

            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao buscar as salas.',
                icon: 'error',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!patrimonioId || !salaId || !tipo) {

            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos.',
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
                tipo,
                patrimonioId: Number(patrimonioId),
                salaId: Number(salaId)
            };

            await api.post('/movimentacao', dados);

            await Swal.fire({
                title: 'Sucesso!',
                text: 'Movimentação cadastrada com sucesso!',
                icon: 'success',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });

            router.push('/dashboardadmin');

        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text:
                    error.response?.data?.erro ||
                    'Erro ao cadastrar a movimentação.',
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
        router.push('/dashboardadmin');
    };

    return {
        patrimonioId,
        setPatrimonioId,
        salaId,
        setSalaId,
        tipo,
        setTipo,
        patrimonios,
        salas,
        salvando,
        salvar,
        cancelar
    };
}