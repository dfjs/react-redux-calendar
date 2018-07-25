import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CalendarReminder } from './index';

Enzyme.configure({ adapter: new Adapter() });

const date = new Date(2018, 7, 24, 9, 27);
const now = Date.now();

function setup() {

  const props = {
    reminder: { id: now, date, text: 'A reminder' , colour: '#cccccc' },
    openModal: jest.fn()
  };

  const enzymeWrapper = mount(<CalendarReminder {...props} />);

  return {
    props,
    wrapper: enzymeWrapper
  }
}

describe('CalendarReminder', () => {

  it('should render', () => {
    const { wrapper } = setup();
  });

  it('should show the Reminder details, and use the selected colour', () => {
    const { wrapper } = setup();

    const text = wrapper.find('.CalendarReminder__reminder').text();
    expect(text).toEqual('09:27 A reminder');

    const span = wrapper.find('.CalendarReminder__reminder span');
    expect(span.prop('style')).toHaveProperty('color','#cccccc');
  });
});
