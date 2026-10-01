'use client'

import Movimentacoes from '@/app/components/Movimentacoes';
import '@/app/css/styleDashboard.css';
import NavBarAdmin from '../components/NavBarAdmin';

export default function Dashboard() {
    return (
        <main className="dashboard-page">

            <NavBarAdmin/>

            <Movimentacoes />

        </main>
    );
}