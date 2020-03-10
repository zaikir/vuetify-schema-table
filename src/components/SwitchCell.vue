<script>
import { VSwitch } from 'vuetify/lib/components';

export default {
  functional: true,
  props: {
    value: Boolean,
  },
  render(createElement, context) {
    return createElement(VSwitch, {
      props: {
        ...context.props,
        inputValue: context.props.value,
        dense: true,
        disabled: true,
        color: 'white'
      },
      class: {
        'mt-0': true,
        'vdk-table-switch': true,
      },
    });
  },
};
</script>
<style>
.vdk-table-switch .v-messages {
  display: none;
}
</style>
