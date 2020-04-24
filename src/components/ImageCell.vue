<script>
import { VImg } from 'vuetify/lib/components';

export default {
  functional: true,
  props: {
    width: 48,
    value: Object,
    resolve: x => x.url,
  },
  render(createElement, context) {
    const { value } = context.props

    return createElement(VImg, {
      props: {
        width,
        src: resolve(value)
      },
    });
  },
};
</script>
