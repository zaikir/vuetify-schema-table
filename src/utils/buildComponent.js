export default (element, {
  types,
  globalProps,
  globalClasses,
} = {}) => {
  const {
    type, class: _class = {}, style, ...props
  } = element;

  const { component, ...rest } = (types[type] || {});

  return {
    component,
    type,
    props: { ...globalProps, ...props },
    class: { ...globalClasses, ..._class },
    style,
    ...rest,
  };
};
