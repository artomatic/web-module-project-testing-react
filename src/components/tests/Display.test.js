import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

const exampleShow = {
    name: 'mockName', 
    summary: 'mockSummary',
    seasons: [
        {name: 'tomato', id: 0, episodes: []},
        {name: 'cucumber', id: 1, episodes: []},
        {name: 'eggplant', id: 2, episodes: []}
    ]   
}

test('renders without errors with no props', async () => {
    render (<Display/>);
});

test('renders Show component when the button is clicked ', async () => {
    //return our test data when the mockFetch function is called instead of retrieving from API call
    mockFetchShow.mockResolvedValueOnce(exampleShow);
    render(<Display/>);
    const button = screen.getByRole('button')
    userEvent.click(button);
    const show = await screen.findByTestId('show-container');

    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShow);
    render(<Display/>);
    const button = screen.getByRole('button')
    userEvent.click(button);
    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(3);
    })
    
});

test('functional prop gets called when fetch is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(exampleShow);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole('button')
    userEvent.click(button);
    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
})

