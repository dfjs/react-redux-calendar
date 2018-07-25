export const CONTROLS_CHANGE_MONTH = 'CONTROLS_CHANGE_MONTH';
export const CONTROLS_CHANGE_YEAR = 'CONTROLS_CHANGE_YEAR';

export function changeMonth(month) {
  return { type: CONTROLS_CHANGE_MONTH, month };
}

export function changeYear(year) {
  return { type: CONTROLS_CHANGE_YEAR, year };
}
