import {
  CheckboxCell, DateCell, DateTimeCell, EmailCell, PhoneCell, PhonesCell, SelectCell, SwitchCell,
  ImageCell, ImagesCell
} from './components';

export default {
  checkbox: { 
    component: CheckboxCell,
    noEmptyIcon: true
  },
  switch: { 
    component: SwitchCell,
    noEmptyIcon: true,
    postProcessProps: ({props, item})=> {
      return {props: {...props, $item: item}}
    }
  },
  date: { component: DateCell },
  datetime: { component: DateTimeCell },
  email: { component: EmailCell },
  phone: { component: PhoneCell },
  phones: { component: PhonesCell },
  select: { component: SelectCell },
  image: { component: ImageCell },
  images: { component: ImagesCell },
};
