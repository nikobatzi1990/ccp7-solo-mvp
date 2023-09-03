import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

test('component uses className prop as class name', async () => {
  render(<Header className='homepage-header'></Header>)
   const testHeader = await screen.findAllByRole('header');
   expect(testHeader).toHaveClass('homepage-header');
})