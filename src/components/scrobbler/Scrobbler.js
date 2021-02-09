import throttle from 'lodash/throttle';
import delay from 'lodash/delay';

export default {
  props: ["lfm", "tracks", "loadingObject"],
  data: function() {
    return {
      success: null,
      sending: false,
      progress: 0
    };
  },
  template: /*html*/ `<div class="manager__buttons is-right">
		<vs-button v-if="tracks" @click="handleClick"
			:loading="sending"
			:danger="success === false"
			:success="success === true"
      size="large">
			<i v-if="success" class="bx bx-check"></i>&nbsp;{{success?'Scrobbled':'Scrobble selected'}}
		</vs-button>
  </div>`,
  computed: {
    setLoading: vm => vm.loadingObject.setLoading,
    setLoadingProgress: vm => vm.loadingObject.setLoadingProgress
  },
  watch: {
    progress: function(value){
      this.setLoadingProgress(value)
    },
    sending: function(value){
      this.setLoading(value, true)
    }
  },
  methods: {
    async scrobbleSingle(artist, track, timestamp) {
      await new Promise((resolve,reject)=>{
        this.lfm.track.scrobble(
          {
            artist: artist,
            track: track,
            timestamp: timestamp,
          },
          function (err, scrobbles) {
            if (err) {
              reject(new Error(err))
            }
            console.log("We have just scrobbled:", scrobbles);
            resolve(scrobbles);
          }
        )
      })
    },
    async scrobbleMultiple(tracks) {
      this.sending = true;
      let isAtLeastOneError = false;

      for (const [index, track] of tracks.entries()) {
        const singleResult = await this.scrobbleSingle(
          track.artist,
          track.track,
          track.timestamp
        );
        if (singleResult === false) {
          isAtLeastOneError = true;
        };
        this.progress = +((index * 100 / tracks.length).toFixed());
      }

      if (isAtLeastOneError) {
        this.success = false;
      } else {
        this.success = true;
      }
      this.sending = false;
    },
    handleClick: function() {
      this.tracks.length && this.scrobbleMultiple(this.tracks);
    },
  },
};
