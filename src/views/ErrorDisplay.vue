<template>
  <div v-if="errors.length" class="error-container">
    <ul class="error-list">
      <li v-for="(error, index) in errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.error-container {
  background-color: #fff5f5;
  border-left: 4px solid #ff4d4d;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.error-list {
  margin: 0;
  padding-left: 1.2rem;
  color: #cc0000;
  font-size: 0.9rem;
  font-family: sans-serif;
  text-align: left;
}

.error-list li {
  margin-bottom: 0.2rem;
}
</style>
