<script>
import moment from 'moment-mini';

export default {
  functional: true,
  props: {
    value: String,
    format: String,
  },
  render(createElement, context) {
    const { value, format } = context.props
    return createElement('span', moment(value).format(format || 'DD.MM.YYYY'));
  },
};
</script>
