// import * as lastfmJson from '@/lastfm.json';
const LastfmAPI = require('lastfmapi');

const lastfmApiKey = process.env.LASTFM_API_KEY;
const lastfmApiSecret = process.env.LASTFM_API_SECRET;

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