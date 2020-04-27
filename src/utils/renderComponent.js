import { VSkeletonLoader } from 'vuetify/lib/components';

export default (h, node, item, {
  context = {},
  ...options
} = {}) => {
  const { propsResolver, skeletonLoading } = options;
  const {
    component, props, class: _class, style, 
    postProcessProps = ({ props: _props }) => ({ props: _props }),
    methods = [],
    noEmptyIcon
  } = node;

  const totalContext = { item, ...context };
  const systemKeys = ['resolveValue', 'postProcess']
  const totalProps = Object.assign({}, ...Object.entries(props)
    .filter(([key]) => !key.startsWith('@') && !key.startsWith('$') && !systemKeys.includes(key))
    .map(([key, value]) => {
      if (key === 'value') {
        return { 
          value: props.resolveValue ? props.resolveValue(item[value]) : item[value]
        };
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
  
  if ((!totalProps.value || (typeof totalProps.value ==='object' && !totalProps.value.length)) && !noEmptyIcon && !skeletonLoading) {
    return '—'
  }

  return skeletonLoading 
  ? h(VSkeletonLoader, {
    props: { loading: skeletonLoading, type: 'text', ...props.skeleton },
    class: 'vsh-skeleton-loading'
  })
  : component ?  h(component, {
    ...postProcessProps({ props: totalProps, options, ...totalContext }),
    class: _class,
    style,
    on: {
      input: val => {
        item[props.value] = val
        item[props.value] = props.postProcess ? props.postProcess(item[props.value]) : item[props.value];
      },
      ...on,
    },
  }) : totalProps.value
};