<script>
import moment from 'moment-mini';

export default {
  functional: true,
  props: {
    value: String,
    format: String,
  },
  render(createElement, context) {
    if (!context.props.value) { return createElement('span', '—'); }
    return createElement('span', moment(context.props.value).format(context.props.format || 'DD.MM.YYYY'));
  },
};
</script>
