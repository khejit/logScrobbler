export default {
    props: ['fit'],
    template: /*html*/ `<div class="app__stage" :class="{fit}">
        <slot :set-loading="setLoading" :set-loading-progress="setLoadingProgress"></slot>
    </div>`,
    data(){
        return {
          vsLoadingInstance: null,
          loading: false,
          withProgress: false
        };
    },
    methods: {
        setLoading(value, withProgress = false) {
            this.withProgress = withProgress;
            this.loading = !!value;
        },
        setLoadingProgress(value) {
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
        }
    }
}