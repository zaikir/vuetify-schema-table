<script>
import Vue from 'vue';
import types from './types';
import propsResolver from './propsResolver';
import BaseTable from './BaseTable.vue';
import { buildComponent, renderComponent } from './utils';

export default {
  functional: true,
  name: 'VuetifySchemaTable',
  props: {
    fields: { type: Array, required: true },
    globalProps: Object,
    globalClasses: Object,
    context: { type: Object, default: () => ({}) },
  },
  render(h, context) {
    const { props, scopedSlots } = context.data
    const params = Vue.$schemaTable || {};
    const options = {
      types,
      propsResolver,
      ...params,
      globalProps: props.globalProps || params.globalProps || { dense: true },
      globalClasses: props.globalClasses || params.globalClasses || {},
      context: props.context || {},
    };

    const elements = props.fields
      // .filter(({ type }) => options.types[type])
      .map((field) => buildComponent(field, options));

    console.log(elements)

    const totalScopedSlots = {
      ...Object.assign(
        {}, ...elements.map((element) => ({
          [`item.${element.props.value}`]: ({ item }) => renderComponent(h, element, item, options),
        })),
      ),
      ...scopedSlots,
    };

    return h(BaseTable, {
      ...context.data,
      props: {
        ...props,
        headers: props.fields,
      },
      scopedSlots: totalScopedSlots,
    });
  },
};
</script>
