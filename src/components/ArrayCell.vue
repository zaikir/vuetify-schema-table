<script>

export default {
  functional: true,
  props: {
    value: Array,
    resolve: {
      type: Function,
      default: (createElement, x) => createElement('span', x) 
    }
  },
  render(createElement, context) {
    const renderValue = item => {
      return createElement('li', [
        resolve(createElement, item)
      ]);
    }

    return createElement('ul', (context.props.value || []).map(renderPhone))
  },
};
</script>
