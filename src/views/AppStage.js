export default {
    props: ['fit'],
    template: /*html*/ `<div class="app__stage" :class="{fit}">
        <slot :set-app-loading="setLoading"></slot>
    </div>`,
    data(){
        return {
          vsLoadingInstance: null,
          loading: false,
        };
    },
    methods: {
        setLoading(value) {
            this.loading = !!value;
        }
    },
    watch: {
        loading: function(newVal) {
            if (newVal) {
                this.vsLoadingInstance = this.$vs.loading();
            } else {
                this.vsLoadingInstance.close();
            }
        }
    }
}