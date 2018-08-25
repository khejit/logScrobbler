export default {
    props: [
        'lfm',
        'tracks'
    ],
    data: function(){
        return {
            success: null,
            sending: false
        }
    },
    template: /*html*/ `<button v-if="tracks" class="button" @click="handleClick"
        :class="{
            'is-danger': success === false,
            'is-success': success === true,
            'is-info': success === null,
            'is-loading': sending
            }">
        Scrobble checked
     </button>`,
    methods: {
        scrobbleSingle: function(artist, track, timestamp){
            this.lfm.track.scrobble({
                'artist': artist,
                'track': track,
                'timestamp': timestamp
            }, function (err, scrobbles) {
                if (err) {
                    console.log(err);
                    return false; 
                }
                console.log('We have just scrobbled:', scrobbles);
                return true;
            });
        },
        scrobbleMultiple: function(tracks){
            this.sending = true;
            let isAtLeastOneError = false;
            tracks.forEach(track=>{
                const singleResult = this.scrobbleSingle(track.artist, track.track, track.timestamp);
                if (singleResult === false) {
                    isAtLeastOneError = true;
                }
            })
            if (isAtLeastOneError) {
                this.success = false;
            } else {
                this.success = true;
            }
            this.sending = false;
        },
        handleClick: function(){
            this.tracks.length && this.scrobbleMultiple(this.tracks);
        }
    }
}