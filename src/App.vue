<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
import '@/components/global'

export default {
  mounted(){
    console.log(this.$options.components)
  }
}
</script>

<style lang="sass">
@import '@/assets/scss/main.scss';
</style>
