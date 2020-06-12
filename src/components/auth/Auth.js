import * as lastfmJson from '@/lastfm.json';
const LastfmAPI = require('lastfmapi');

export default {
    data: function () {
        return {
            lfm: null,
        }
    },
    methods: {
        setUpLfm: function () {
            this.lfm = new LastfmAPI({
                'api_key': lastfmJson.apiKey,
                'secret': lastfmJson.apiSecret
            });
        },
        setSessionCredentials(session){
            this.lfm.setSessionCredentials(session.username, session.key)
        }
    }
}