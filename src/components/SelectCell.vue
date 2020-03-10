<script>
export default {
  functional: true,
  props: {
    value: String,
    itemValue:  {
      type: String,
      default: 'value',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    items: {
      type: Array,
      default: [],
    }
  },
  render(createElement, context) {
    const { items, itemValue, itemText, value } = context.props
    const elem = items.find((x) => x[itemValue] === value);
    if (!elem) { return '—'; }

    return createElement('span', elem[itemText]);
  },
};
</script>
