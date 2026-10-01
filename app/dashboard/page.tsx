'use client'

import Movimentacoes from '@/app/components/Movimentacoes';
import '@/app/css/styleDashboard.css';
import NavBar from '../components/NavBar';

export default function Dashboard() {
    return (
        <main className="dashboard-page">

            <NavBar/>

            <Movimentacoes />

        </main>
    );
}