export default {
    props: [
        'lfm'
    ],
    template: `<a @click.prevent="scrobble" class="button">Scrobble test</a>`,
    methods: {
        scrobble: function(){
            this.lfm.track.scrobble({
                'artist' : 'Pain of Salvation',
                'track' : 'Conditioned',
                'timestamp' : Math.floor((new Date()).getTime() / 1000) - 300 // 5 min ago
            }, function (err, scrobbles) {
                if (err) { return console.log('We\'re in trouble', err); }
                console.log('We have just scrobbled:', scrobbles);
            });
        }
    }
}