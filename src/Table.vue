<script>
import Vue from 'vue';
import types from './types';
import propsResolver from './propsResolver';
import BaseTable from './components/BaseTable.vue';
import { buildComponent, renderComponent } from './utils';

export default {
  name: 'VuetifySchemaTable',
  props: {
    fields: {
      type: Array,
      required: true,
    },
    globalProps: {
      type: Object,
      default: null,
    },
    globalClasses: {
      type: Object,
      default: null,
    },
    context: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h) {
    const params = Vue.$schemaTable || {};
    const options = {
      types,
      propsResolver,
      ...params,
      globalProps: this.globalProps || params.globalProps || { dense: true },
      globalClasses: this.globalClasses || params.globalClasses || {},
    };

    const elements = this.fields
      .filter(({ type }) => options.types[type])
      .map((field) => buildComponent(field, options));

    return h(BaseTable, {
      props: {
        ...this.$attrs,
        headers: this.fields,
      },
      scopedSlots: {
        ...elements.map((element) => ({
          [`item.${element.value}`]: ({ item }) => renderComponent(h, element, item, options),
        })),
        ...this.$scopedSlots,
      },
    });
  },
};
</script>
