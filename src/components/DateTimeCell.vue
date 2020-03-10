<script>
import moment from 'moment-mini';

export default {
  functional: true,
  props: {
    value: String,
    timezone: { type: Number },
    format: {
      type: String,
      default: 'DD.MM.YYYY HH:mm'
    }
  },
  render(createElement, context) {
    const { 
      value, 
      timezone = -(new Date().getTimezoneOffset() / 60), 
      format 
    } = context.props

    return createElement('span', moment(value).utcOffset(timezone * 60).format(format));
  },
};
</script>
