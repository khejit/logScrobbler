import * as lastfmJson from '../../../../lastfm.json';
import LastfmAPI from 'lastfmapi';

export default {
    data: function () {
        return {
            lfm: null,
        }
    },
    methods: {
        setUpLfm: function () {
            this.lfm = new LastfmAPI({
                api_key: lastfmJson.apiKey,
                secret: lastfmJson.apiSecret
            });
        },
    }
}