<template>
  <time :datetime="datetimeString">{{ formattedString }}</time>
</template>

<style scoped>
time {
  color: rgba(0, 0, 0, 0.54);
  font-family: monospace;
  font-size: 0.8rem;
}
</style>

<script>
import dayjs from "dayjs";

export default {
  computed: {
    time() {
      return dayjs(this.timeString, "YYYY-MM-DDTHH:mm:ssZZ");
    },
    formattedString() {
      return this.time.format("YYYY-MM-DD HH:mm");
    },
    datetimeString() {
      return this.time.format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
    }
  },
  props: {
    timeString: String
  }
};
</script>
