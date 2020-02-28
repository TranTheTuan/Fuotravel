import * as _moment from 'moment';

const moment = _moment;

export function dateFormat(value) {
  return moment(value).format('YYYY/MM/DD hh:mm:ss');
}
