<script>
import { VSwitch } from 'vuetify/lib/components';

export default {
  functional: true,
  render(createElement, context) {
    return createElement(VSwitch, {
      props: {
        disabled: true,
        ...context.props,
        inputValue: context.props.value,
        dense: true,
        color: 'white'
      },
      class: {
        'mt-0': true,
        'vdk-table-switch': true,
      },
      on: {
        change: (val) => {
          if (context.data.on.input) { context.data.on.input(val) }
        }
      },
      nativeOn: {
        ...context.data.nativeOn,
        click: (event) => {
          if (context.data.on.click) {
            context.data.on.click(context.props.$item, context.props.value)
          }
          event.stopPropagation()
        }
      }
    });
  },
};
</script>
<style>
.vdk-table-switch .v-messages {
  display: none;
}
</style>
