import styled, {keyframes, css} from 'styled-components'

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;
        
        svg {
            margin-right: 10px;
        }
    }
`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.error ? '#FF0000' : '#eee')}; // se error for true (se existir um erro) vai ser a cor vermelha se nao vai ser a normal (branca)
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

// Criando animação do botão
const animate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading, // se for 1 ele vai desativar
}))`
    background: #0D2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    justify-content: center;
    align-items: center;

    &[disabled] { // quando for disabled:
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading && // quando estiver carregando: 
        css`
        svg {
            animation: ${animate} 2s linear infinite;
        }
        `
        
    }

`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;


    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        & + li { // no primeiro ele vai ignorar e no segundo ele vai começar a colocar esse estilo
            border-top: 1px solid #eee;
        }
    }

    a {
        color: #0D2636;
        text-decoration: none;
    }

`;


export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    background: transparent;
    color: #0D2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;

export const RepoButton = styled.button`

`