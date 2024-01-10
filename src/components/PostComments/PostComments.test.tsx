import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Post from '.';
import PostComments from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
    render(<PostComments />);
    expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve adicionar dois comentários corretamente', () => {
        render(<Post />);
        const textarea = screen.getByTestId('post-comments-form-textarea');
        const button = screen.getByTestId('post-comments-form-button');

        fireEvent.change(textarea, { target: { value: 'Primeiro comentário' } });
        fireEvent.click(button);

        fireEvent.change(textarea, { target: { value: 'Segundo comentário' } });
        fireEvent.click(button);

        const comments = screen.getAllByTestId(/^comment-/);
        expect(comments).toHaveLength(2);
        expect(comments[0]).toHaveTextContent('Primeiro comentário');
        expect(comments[1]).toHaveTextContent('Segundo comentário');
    });
});
