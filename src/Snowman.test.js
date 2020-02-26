import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Snowman from './Snowman';

//Smoke Test
it("renders without crashing", function() {
  render(<Snowman />);
});

//Snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});


it("Image 0 will be Image 1 upon choosing a wrong letter", function() {
  const { queryByAltText, getByText } = render(<Snowman words={['apple']}/>);

   const letter = getByText("t");
   fireEvent.click(letter);

  // expect the first image to hide, but not the second
  expect(queryByAltText('img1')).toBeInTheDocument();
  expect(queryByAltText('img0')).not.toBeInTheDocument();

});

it("Image doesn't change and the correct letter is rendered for correct guess", function() {
  const { queryByAltText, getByText } = render(<Snowman words={['apple']}/>);

   const letter = getByText("a");
   fireEvent.click(letter);

  expect(queryByAltText('img0')).toBeInTheDocument();
  expect(getByText('a____')).toBeInTheDocument();


});