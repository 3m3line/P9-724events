import { render } from '@testing-library/react';
import Logo from '.';

describe('Logo Component', () => {
  it('should render correctly with default size', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '130');
    expect(svg).toHaveAttribute('height', '60');
  });

  it('should render correctly with large size', () => {
    const { container } = render(<Logo size="large" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '160');
    expect(svg).toHaveAttribute('height', '60');
  });

  it('should use the correct default props', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '130');
    expect(container.querySelector('svg')).toHaveAttribute('height', '60');
  });
});