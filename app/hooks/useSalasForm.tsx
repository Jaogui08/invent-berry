'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';

export function useSalasForm() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [leitorId, setLeitorId] = useState('');
    const [salvando, setSalvando] = useState(false);

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !leitorId) {
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
            await api.post('/sala', {
                nome,
                leitorId
            });

            await Swal.fire({
                title: 'Sucesso!',
                text: 'Sala cadastrada com sucesso!',
                icon: 'success',
                confirmButtonColor: '#ca0101',
                color: '#e6e6e6',
                background: "#211d1d",
            });

            router.push('/dashboardadmin');

        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: error.response?.data?.erro || 'Erro ao cadastrar a sala.',
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
        nome,
        setNome,
        leitorId,
        setLeitorId,
        salvar,
        cancelar,
        salvando
    };
}