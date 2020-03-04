<script>
export default {
  functional: true,
  props: {
    value: String,
    itemValue: String,
    itemText: String,
    items: Array,
  },
  render(createElement, context) {
    if (!context.props.value) { return createElement('span', '—'); }

    const elem = (context.props.items || []).find((x) => x[context.props.itemValue || 'value'] === context.props.value);
    if (!elem) { return '—'; }

    return createElement('span', elem[context.props.itemText || 'text']);
  },
};
</script>
