<template>
  <div>
    <v-container>
      <v-row>
        <div class="text-h5">{{ title }}</div>
        <p class="green--text">
          You should see this page without need to authentication!
        </p>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  // transition: 'slide-bottom',
  name: 'ProductDetail',
  asyncData({ params, $axios, route }) {
    return $axios.$get(`/api/product/${params.id}`).then((res) => {
      return {
        title: res.result.image.src,
        rendering: process.server ? 'server' : 'client',
      }
    })
  },
}
</script>
<style scoped>
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all 0.5s ease;
  transform: translate(-100%, 0);
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
