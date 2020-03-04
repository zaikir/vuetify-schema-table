<script>
import Vue from 'vue';
import types from './types';
import propsResolver from './propsResolver';
import BaseTable from './components/BaseTable.vue';
import { buildComponent, renderComponent } from './utils';

export default {
  functional: true,
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
  render(h, context) {
    const params = Vue.$schemaTable || {};
    const options = {
      types,
      propsResolver,
      ...params,
      globalProps: context.data.props.globalProps || params.globalProps || { dense: true },
      globalClasses: context.data.props.globalClasses || params.globalClasses || {},
    };

    const elements = context.data.props.fields
      .filter(({ type }) => options.types[type])
      .map((field) => buildComponent(field, options));


    return h(BaseTable, {
      ...context.data,
      props: {
        ...context.data.props,
        headers: context.data.props.fields,
      },
      scopedSlots: {
        ...elements.map((element) => ({
          [`item.${element.value}`]: ({ item }) => renderComponent(h, element, item, options),
        })),
        ...context.data.scopedSlots,
      },
    });
  },
};
</script>
