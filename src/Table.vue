<script>
import Vue from 'vue';
import types from './types';
import propsResolver from './propsResolver';
import BaseTable from './BaseTable.vue';
import { VSkeletonLoader } from 'vuetify/lib/components';
import { buildComponent, renderComponent } from './utils';

export default {
  functional: true,
  name: 'VuetifySchemaTable',
  props: {
    fields: { type: Array, required: true },
    globalProps: Object,
    globalClasses: Object,
    skeletonLoading: Boolean,
    skeletonRowsCount: Number,
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
      skeletonLoading: props.skeletonLoading,
    };

    const elements = props.fields
      .map((field) => buildComponent(field, options));

    const totalScopedSlots = {
      ...Object.assign(
        {}, ...elements.map((element) => ({
          [`item.${element.props.value}`]: ({ item }) => renderComponent(h, element, item, options),
        })),
      ),
      ...!props.skeletonLoading && scopedSlots,
      ...props.skeletonLoading && Object.assign(
        {}, ...props.fields
        .filter(field => field.headerSkeleton !== false && field.headerSkeleton !== null)
        .map((field) => ({
          [`header.${field.value}`]: ({ item }) => h(VSkeletonLoader, { props: {type: 'text', transition: "fade-transition", ...(field.headerSkeleton || field.skeleton)} }),
        })),
      ),
    };

    const { itemsPerPage = 10, hideDefaultHeader } = (props.options || {})
    const skeletonLoading = props.skeletonLoading && itemsPerPage
    const skeletonLoadingProps = skeletonLoading
      ? {
        items: [...new Array(props.skeletonRowsCount ? props.skeletonRowsCount : itemsPerPage).keys()].map(() => ({})),
        serverItemsLength: itemsPerPage,
        loading: false,
      }
      : {}

    return h(BaseTable, {
      ...context.data,
      props: {
        ...props,
        ...skeletonLoadingProps,
        headers: !skeletonLoading ? props.fields : props.fields.map(x => ({...x, sortable: false})),
      },
      scopedSlots: totalScopedSlots,
    });
  },
};
</script>
<style>
  .vsh-skeleton-loading .v-skeleton-loader__text {
    margin-bottom: 0px;
  }
</style>