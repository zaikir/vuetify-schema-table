<script>
import { VImg } from 'vuetify/lib/components';

export default {
  functional: true,
  props: {
    width: {
      type: Number,
      default: 40
    },
    value: {
      type: Object,
      required: true
    },
    resolve: {
      type: Function,
      default: x => x.url,
    }
  },
  render(createElement, context) {
    const { value, width, resolve } = context.props

    return createElement('a', {
      attrs: {
        href: resolve(value),
        target: '_blank',
      }
    }, [createElement(VImg, {
      props: {
        width,
        aspectRatio: 1,
        src: resolve(value)
      },
      style: 'border: thin solid gray;cursor:zoom-in;',
      class: {
        'ma-2': true,
        'v-sheet': true
      }
    })]);
  },
};
</script>
