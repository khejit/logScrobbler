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
        const session = this.recoverSession();
        if (session){
            this.setSessionCredentials(session)
        } else {
            this.logout();
        };
    },
    methods: {
        recoverSession: function () {
            const session = localStorage.getItem('session');
            if (session) {
                this.session = JSON.parse(session);
                return this.session;
            }

            return false;
        },
        logout: function () {
            localStorage.removeItem('session');
            this.$router.push({ name: 'start' });
        }
    }
}