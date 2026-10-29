'use client';

import NavbarAdmin from '@/app/components/NavBarAdmin';
import { useSalasForm } from '@/app/hooks/useSalasForm';
import '@/app/css/styleCadastros.css';

export default function CadastroSala() {

    const {
        nome,
        setNome,
        leitorId,
        setLeitorId,
        editandoId,
        carregando,
        salvar,
        cancelar,
        salvando
    } = useSalasForm();

    if (carregando) {

        return (

            <main className="cadastro-page">

                <NavbarAdmin />

                <section className="form-container">

                    <p>
                        Carregando sala...
                    </p>

                </section>
            </main>
        );
    }

    return (

        <main className="cadastro-page">

            <NavbarAdmin />

            <section className="form-container">

                <h1>

                    {editandoId !== null
                        ? 'Editar sala'
                        : 'Cadastrar sala'
                    }

                </h1>

                <form onSubmit={salvar}>

                    <div className="campo">

                        <label>
                            Nome da sala
                        </label>

                        <input
                            type="text"
                            value={nome}
                            onChange={(e) =>setNome(e.target.value)}
                            placeholder="Digite o nome da sala"
                        />

                    </div>

                    <div className="campo">

                        <label>
                            ID do leitor
                        </label>

                        <input
                            type="text"
                            value={leitorId}
                            onChange={(e) => setLeitorId(e.target.value)}
                            placeholder="Ex: LEITOR_01"
                        />

                    </div>

                    <div className="botoes">

                        <button
                            type="button"
                            onClick={cancelar}
                            className="btn-cancelar"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn-salvar"
                            disabled={salvando}
                        >
                            {salvando
                                ? 'Salvando...'
                                : editandoId !== null
                                    ? 'Atualizar'
                                    : 'Cadastrar'
                            }
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}