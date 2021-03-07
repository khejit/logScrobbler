<template>
	<vs-checkbox v-model="dontRemindAgain">I know, don't show this again.</vs-checkbox>
</template>

<script>
export default {
    data(){
        return {
            dontRemindAgain: false
        }
    },
    watch: {
        'dontRemindAgain': function(val){
            localStorage.setItem('dontRemindAgain', val)
        }
    }
};
</script>

<style lang="scss" scoped>

</style>