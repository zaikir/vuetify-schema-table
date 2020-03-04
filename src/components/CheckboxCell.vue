<script>
import { VCheckbox } from 'vuetify/lib/components';

export default {
  functional: true,
  props: {
    value: Boolean,
  },
  render(createElement, context) {
    return createElement(VCheckbox, {
      props: {
        large: true,
        ...context.props,
        inputValue: context.props.value,
        dense: true,
        disabled: true,
      },
      class: {
        'mt-0': true,
        'vdk-table-checkbox': true,
      },
    });
  },
};
</script>
<style>
.vdk-table-checkbox .v-messages {
  display: none;
}
</style>
