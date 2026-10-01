'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Movimentacao } from '@/app/types/Movimentacao';

export function useMovimentacoes() {
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
    const [carregando, setCarregando] = useState(true);

    const buscarMovimentacoes = async () => {
        try {
            const resposta = await api.get('/movimentacao');
            setMovimentacoes(resposta.data);
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscarMovimentacoes();
    }, []);

    return {
        movimentacoes,
        carregando,
        buscarMovimentacoes
    };
}