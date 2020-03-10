<script>
const formatPhone = (phone = '', countryCode, sign) => {
  const clearedPhone = sign + countryCode + phone.replace(/[ -+]/, '').trim();
  if (clearedPhone.startsWith('+7') && clearedPhone.length === 12) {
    return { display: `+7 (${clearedPhone.substr(2, 3)}) ${clearedPhone.substr(5, 3)}-${clearedPhone.substr(8, 2)}-${clearedPhone.substr(10, 3)}`, internal: clearedPhone };
  }

  return { display: clearedPhone, internal: clearedPhone };
};

export default {
  functional: true,
  props: {
    value: String,
    sign: {
      type: String,
      default: '+',
    },
    countryCode: {
      type: String,
      default: '7',
    },
  },
  render(createElement, context) {
    const phone = formatPhone(context.props.value, context.props.countryCode, context.props.sign);
    return createElement('a', {
      attrs: {
        href: `tel://${phone.internal}`,
        itemprop: 'telephone',
      },
    }, phone.display);
  },
};
</script>
