import {
  CheckboxCell, DateCell, DateTimeCell, EmailCell, PhoneCell, SelectCell, SwitchCell,
} from './components';

export default {
  checkbox: { component: CheckboxCell },
  switch: { component: SwitchCell },
  date: { component: DateCell },
  datetime: { component: DateTimeCell },
  email: { component: EmailCell },
  phone: { component: PhoneCell },
  select: { component: SelectCell },
};
