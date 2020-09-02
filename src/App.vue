<template>
  <div id="app" class="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
import '@/components/global';

export default {
  
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
