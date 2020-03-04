<script>
const formatPhone = (phone, countryCode, sign) => {
  const clearedPhone = sign + countryCode + phone.replace(/[ -+]/, '').trim();
  if (clearedPhone.startsWith('+7') && clearedPhone.length === 12) {
    return { display: `+7 (${phone.substr(2, 3)}) ${phone.substr(5, 3)}-${phone.substr(8, 2)}-${phone.substr(10, 3)}`, internal: clearedPhone };
  }

  return { display: clearedPhone, internal: clearedPhone };
};

export default {
  functional: true,
  props: {
    value: String,
    sign: {
      type: String,
      default: '',
    },
    countryCode: {
      type: String,
      default: '',
    },
  },
  render(createElement, context) {
    if (!context.props.value) { return createElement('span', '—'); }

    const phone = formatPhone(context.props.value, this.countryCode, this.sign);
    return createElement('a', {
      attrs: {
        href: `tel://${phone.internal}`,
        itemprop: 'telephone',
      },
    }, phone.display);
  },
};
</script>
