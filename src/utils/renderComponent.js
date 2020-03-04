export default (h, node, item, {
  context = {},
  scopedSlots = {},
  slots = {},
  ...options
} = {}) => {
  const { propsResolver } = options;

  const {
    component, props, class: _class, style, postProcessProps = ({ props: _props }) => ({ props: _props }),
    methods = [],
  } = node;

  const totalContext = { item, ...context };
  const totalProps = Object.assign({}, ...Object.entries(props)
    .filter(([key]) => !key.startsWith('@') && !key.startsWith('$'))
    .map(([key, value]) => {
      if (key === 'value') {
        return { value: item[value] };
      }

      const resolver = propsResolver[key];

      const actualValue = typeof value === 'function' && !methods.includes(key)
        ? value(totalContext)
        : value;

      return resolver
        ? { ...resolver(actualValue, props) }
        : ({ [key]: actualValue });
    }));

  const events = Object.keys(props).filter((prop) => prop.startsWith('@'));
  const on = {
    ...Object.assign({}, ...events.map((event) => ({
      [`${event.replace('@', '')}`]: props[event],
    }))),
  };

  return props.value && scopedSlots[`field.${props.value}`]
    ? scopedSlots[`field.${props.value}`](totalContext)
    : h(component, {
      ...postProcessProps({ props: totalProps, options, ...totalContext }),
      class: _class,
      style,
      on,
    }, [
      slots[`field.${props.value}`] && slots[`field.${props.value}`].map((func) => func()),
    ]);
};
