import Auth from './Auth';

export default {
    mixins: [Auth],
    data: function () {
        return {
            token: '',
            session: {}
        }
    },
    mounted: function () {
        this.setUpLfm();
        this.recoverSession();
    },
    methods: {
        recoverSession: function () {
            const session = localStorage.getItem('session');
            if (session) {
                this.session = JSON.parse(session);
            }
        },
        logout: function () {
            localStorage.removeItem('session');
            this.$router.push({ name: 'start' });
        }
    }
}