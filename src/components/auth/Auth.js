const LastfmAPI = require('lastfmapi');

const lastfmApiKey = process.env.VUE_APP_LASTFM_API_KEY;
const lastfmApiSecret = process.env.VUE_APP_LASTFM_API_SECRET;

export default {
    data: function () {
        return {
            lfm: null,
        }
    },
    methods: {
        setUpLfm: function () {
            this.lfm = new LastfmAPI({
                'api_key': lastfmApiKey,
                'secret': lastfmApiSecret
            });
        },
        setSessionCredentials(session){
            this.lfm.setSessionCredentials(session.username, session.key)
        }
    }
}