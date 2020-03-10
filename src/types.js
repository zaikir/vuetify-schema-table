import {
  CheckboxCell, DateCell, DateTimeCell, EmailCell, PhoneCell, SelectCell, SwitchCell,
} from './components';

export default {
  checkbox: { 
    component: CheckboxCell,
    noEmptyIcon: true
  },
  switch: { 
    component: SwitchCell,
    noEmptyIcon: true
  },
  date: { component: DateCell },
  datetime: { component: DateTimeCell },
  email: { component: EmailCell },
  phone: { component: PhoneCell },
  select: { component: SelectCell },
};
