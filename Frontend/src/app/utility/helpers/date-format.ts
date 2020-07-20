import * as _moment from 'moment';

const moment = _moment;

export function dateFormat(value, isBirthday = false) {
  if (isBirthday) {
    return moment(value).format('YYYY/MM/DD');
  }
  return moment(value).format('YYYY/MM/DD hh:mm:ss');
}
