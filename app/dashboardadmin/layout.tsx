'use client';

import { useProtecaoRota } from '@/app/hooks/useProtecaoRota';

export default function DashboardAdminLayout({
    children
}: {
    children: React.ReactNode
}) {

    const { carregando } = useProtecaoRota('adm');

    if (carregando) {

        return (
            <div
                style={{
                    minHeight: '100vh',
                    background: '#111',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                Verificando acesso...
            </div>
        );
    }

    return children;
}