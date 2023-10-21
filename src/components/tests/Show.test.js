import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const exampleShow = {
    name: 'mockName', 
    summary: 'mockSummary',
    seasons: [
        {name: 'tomato', id: 0, episodes: []},
        {name: 'cucumber', id: 1, episodes: []},
        {name: 'eggplant', id: 2, episodes: []}
    ]   
}

test('renders without errors', () => {
    render(<Show show={exampleShow} selectedSeason={'none'}/>);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={'none'}/>);
    screen.getByTestId('loading-container');
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={exampleShow} selectedSeason={'none'}/>);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3+1);

});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={exampleShow} selectedSeason={'none'} handleSelect={handleSelect}/>);
    const select = screen.getByLabelText('Select A Season');
    userEvent.selectOptions(select, ['1']);
    expect(handleSelect).toBeCalled;
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} =render(<Show show={exampleShow} selectedSeason={'none'}/>);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();
    rerender(<Show show={exampleShow} selectedSeason={1}/>);
    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();
});
