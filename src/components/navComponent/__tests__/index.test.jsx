import { asFragment } from '@testing-library/react';
import React from 'react';
import { render } from '@testing-library/react';
import NavComponent from '..';
describe('NavComponent', () => {
    it('should render correctly', () => {
        const { asFragment } = render(<NavComponent />);
        expect(asFragment()).toMatchSnapshot();
    });
});
