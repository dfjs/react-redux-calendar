import reminders from './reminders';

describe('reminders reducer', () => {

  it('should have an initial state', () => {
    expect(reminders(undefined, {})).toEqual([]);
    expect(reminders([], {})).toEqual([]);
  });

  it('should handle ADD_REMINDER', () => {

    const date = new Date();

    const state = reminders([], {
      type: 'ADD_REMINDER',
      date,
      text: 'A reminder',
      colour: '#cccccc'
    });

    expect(state[0].text).toEqual('A reminder');
    expect(state[0].date).toEqual(date);
    expect(state[0].colour).toEqual('#cccccc');
    expect(state[0].id).toBeDefined();
  });

  it('should handle EDIT_REMINDER', () => {

    const date = new Date(2018, 6, 24, 9, 27);

    const beforeEditState = reminders([], {
      type: 'ADD_REMINDER',
      date,
      text: 'A reminder',
      colour: '#cccccc'
    });

    const reminder = beforeEditState[0];
    const newDate = new Date(2018, 6, 25, 10, 31);

    const afterEditState = reminders(beforeEditState, {
      type: 'EDIT_REMINDER',
      id: reminder.id,
      date: newDate,
      text: 'An updated reminder',
      colour: '#000000'
    });

    expect(afterEditState[0].text).toEqual('An updated reminder');
    expect(afterEditState[0].date).toEqual(newDate);
    expect(afterEditState[0].colour).toEqual('#000000');
    expect(afterEditState[0].id).toEqual(reminder.id);
  });

  it('should handle DELETE_REMINDER', () => {

    const date = new Date(2018, 6, 24, 9, 27);

    const beforeDeleteState = reminders([], {
      type: 'ADD_REMINDER',
      date,
      text: 'A reminder',
      colour: '#cccccc'
    });

    const reminder = beforeDeleteState[0];

    const afterDeleteState = reminders(beforeDeleteState, {
      type: 'DELETE_REMINDER',
      reminder: { id: reminder.id }
    });

    expect(afterDeleteState.length).toEqual(0);
  });
});
