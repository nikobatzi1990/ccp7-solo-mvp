import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

test('component uses className prop as class name', async () => {
  render(<Footer className='homepage-footer'></Footer>)
   const testHeader = await screen.findAllByRole('header');
   expect(testHeader).toHaveClass('homepage-header');
})