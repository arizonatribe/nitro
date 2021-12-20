import { render } from '@testing-library/react'

import BlogLayout from './blog-layout'

describe('BlogLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogLayout />);
    expect(baseElement).toBeTruthy();
  });
});
