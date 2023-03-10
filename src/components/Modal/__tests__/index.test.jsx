import React from 'react';
import {asFragment, render, screen} from '@testing-library/react';
import ModalComponent from '../index';
describe('Modal', () => {
  it('should render correctly', () => {
    const {asFragment}= render(<ModalComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});