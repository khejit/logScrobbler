import { mapState } from 'vuex';

export default {
    props: ['fit'],
    template: /*html*/ `<div class="app__stage" :class="{fit}">
        <slot></slot>
    </div>`,
    data(){
        return {
          vsLoadingInstance: null
        };
    },
    computed: {
        ...mapState({
            withProgress: state => state.loadingProgress === null ? false : true,
            loading: state => state.loading,
            loadingProgress: state => state.loadingProgress
        })
    },
    methods: {
        setVsLoadingProgress(value) {
            this.vsLoadingInstance && this.vsLoadingInstance.changeProgress('' + value);
        }
    },
    watch: {
        loading: function(newVal) {
            if (newVal) {
                this.vsLoadingInstance = this.withProgress ? this.$vs.loading({
                    progress: 0
                }) : this.$vs.loading()
            } else {
                this.vsLoadingInstance.close();
            }
        },
        loadingProgress: function(newVal) {
            this.setVsLoadingProgress(newVal);
        }
    }
}