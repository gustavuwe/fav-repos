import React, { useState, useCallback, useEffect } from 'react';

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import { Container, Form, SubmitButton, List, DeleteButton } from './styles'

import api from '../../services/api'

export default function Main() {
    
    const [newRepo, setNewRepo] = useState('');

    const [repositorios, setRepositorios] = useState([]); // array de repos

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState(null);

    // Buscar
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage) {
            setRepositorios(JSON.parse(repoStorage));
        }

    }, []);
    

    // Salvar alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);


    const handleSubmit = useCallback((e) => {
        e.preventDefault(); // nao recarrega a página após o clique no botão


        async function submit() {
            setLoading(true);
            setAlert(null);

            try {

                if (newRepo === '') {
                    throw new Error('Você precisa indiciar um repositório')
                }

                const hasRepo = repositorios.find(repo => repo.name === newRepo) // verificando se ja tem um repositorio com o nome que o usuario digitou

                if (hasRepo) {
                    throw new Error('Repositório Duplicado')
                }
                const response = await api.get(`repos/${newRepo}`);

                const data = {
                    name: response.data.full_name,
                }
    
                setRepositorios([...repositorios, data]); // o ... pega tudo que ja existe nos repositorios
                setNewRepo('') // limpa o campo apos o usuario enviar
            } catch (error) {
                setAlert(true);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        submit();


    }, [newRepo, repositorios]);

    function handleInputChange(e) { // quando o campo mudar
        setNewRepo(e.target.value) // armazena em newRepo o que o usuario digitou no forms
        setAlert(null);
    }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo); // pega o nome do repositorio que o usuario clicar pra deletar, e faz um filter procurando todos os repos que sao diferentes desse, e renderizando somente estes.
        setRepositorios(find);
    }, [repositorios]);
    
    return (
        <Container>
            
            <h1>
                <FaGithub size={25} />
                Meus Repositorios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input
                type="text"
                placeholder="Adicionar Repositorios" 
                value={newRepo}
                onChange={handleInputChange} 
                />



                <SubmitButton loading={loading ? 1 : 0}> {/* se for true é 1 se for false é 0e*/}
                {loading ? ( // se for true executa isso:
                    <FaSpinner color = "FFF" size = {14}/>
                ) : ( // se for false executa isso: 
                    <FaPlus color="#FFF" size={14} />
                )} 
                </SubmitButton>

            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                        <DeleteButton onClick={() => handleDelete(repo.name) }>
                            <FaTrash size={14} />
                        </DeleteButton>
                        {repo.name}
                        </span>
                        <a href="">
                            <FaBars size={20}/>
                        </a>
                    </li>
                ))}
            </List>

        </Container>
    )
}