import * as lastfmJson from '@/lastfm.json';
const LastfmAPI = require('lastfm-api-client');

export default {
    data: function () {
        return {
            lfm: null,
        }
    },
    methods: {
        setUpLfm: function () {
            this.lfm = new LastfmAPI({
                apiKey: lastfmJson.apiKey,
                apiSecret: lastfmJson.apiSecret
            });
        },
    }
}