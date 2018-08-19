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
        this.setSessionCredentials();
    },
    methods: {
        recoverSession: function () {
            const session = localStorage.getItem('session');
            if (session) {
                this.session = JSON.parse(session);
            }
        },
        setSessionCredentials: function () {
            this.lfm.setSessionCredentials(...this.session);
        }
    }
}