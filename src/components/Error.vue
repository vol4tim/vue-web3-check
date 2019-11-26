<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String
    }
  }
};
</script>
