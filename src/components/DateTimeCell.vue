<script>
import moment from 'moment-mini';

export default {
  functional: true,
  props: {
    value: String,
    timezone: {
      type: Number,
      required: true,
    },
    format: String,
  },
  render(createElement, context) {
    if (!context.props.value) { return createElement('span', '—'); }

    return createElement('span', moment(context.props.value).utcOffset(context.props.timezone * 60).format(context.props.format || 'DD.MM.YYYY HH:mm'));
  },
};
</script>
