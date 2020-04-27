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
      type: [Object],
      required: true
    },
    resolve: {
      type: Function,
      default: x => x.url,
    }
  },
  render(createElement, context) {
    const { value, width, resolve } = context.props

    if (!value || !value.length) {
      return createElement('span', '—')
    }

    return createElement('div', {}, value.map(img => {
      return createElement('a', {
        attrs: {
          href: resolve(img),
          target: '_blank',
        }
      }, [createElement(VImg, {
        props: {
          width,
          aspectRatio: 1,
          src: resolve(img)
        },
        style: 'border: thin solid gray;cursor:zoom-in;',
        class: {
          'ma-2': true,
          'v-sheet': true
        }
      })]);
    }))
  },
};
</script>
