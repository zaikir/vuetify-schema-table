<script>
import { VDataTable, VProgressLinear } from 'vuetify/lib/components';
import { withDoubleClickEventDataTable } from '../utils';

export default {
  functional: true,
  render(createElement, context) {
    return createElement(withDoubleClickEventDataTable(VDataTable), {
      ...context.data,
      props: {
        ...context.data.props,
        mustSort: true,
      },
      class: 'vst-base-table',
    }, [
      ...context.children || [],
      createElement(
        'div',
        { class: 'progress-area', slot: 'progress' },
        [
          createElement(VProgressLinear, {
            props: {
              height: '2px',
              indeterminate: true,
            },
          }),
        ],
      ),
    ]);
  },
};

</script>
<style>
  .vst-base-table .v-data-table__progress .progress-area {
    position: relative;
  }

  .vst-base-table .v-data-table__progress .progress-area .v-progress-linear {
    position: absolute;
    left: 0;
    top: -1px;
    z-index: 2;
  }
</style>
