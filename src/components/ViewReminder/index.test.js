import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ViewReminder from './index';

Enzyme.configure({ adapter: new Adapter() });

const date = new Date(2018, 6, 24, 9, 27);
const now = Date.now();

function setup() {

  const props = {
    reminder: { id: now, date, text: 'A reminder' , colour: '#cccccc' },
    deleteReminder: jest.fn(),
    onComplete: jest.fn(),
    openModal: jest.fn()
  };

  const enzymeWrapper = mount(<ViewReminder {...props} />);

  return {
    props,
    wrapper: enzymeWrapper
  }
}

describe('ViewReminder', () => {

  it('should render', () => {
    const { wrapper } = setup();
  });

  it('should show the Reminder details, and use the selected colour', () => {
    const { wrapper } = setup();

    const text = wrapper.find('.ViewReminder__text').text();
    expect(text).toEqual('A reminder');

    const span = wrapper.find('.ViewReminder__text span');
    expect(span.prop('style')).toHaveProperty('color','#cccccc');

    const dateTime = wrapper.find('.ViewReminder__datetime').text();
    expect(dateTime).toEqual('at 9:27am on 24/07/2018');
  });
});
