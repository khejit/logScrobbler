import Scrobbler from './scrobbler/Scrobbler';
import LoggedAuth from './auth/LoggedAuth';
import Stage from './Stage';
import FileInput from './FileInput';
import Manager from './Manager';

export default {
  name: 'Logged',
  mixins: [
    LoggedAuth
  ],
  components: {
    Scrobbler,
    Stage,
    FileInput,
    Manager
  },
  data: function () {
    return {
      actions: [
        {
          text: 'Logout',
          function: this.logout
        }
      ],
      tracks: []
    };
  },
  computed: {
    username: function () {
      return this.session.username;
    }
  },
  template: /*html*/ `<Stage :fit="!tracks.length">
        <Hero title="Logged in as" :subtitle="username" :actions="actions"></Hero>
        <Column :vcentered="!tracks.length">
          <Manager v-if="tracks.length" :initialTracks="tracks" :lfm="lfm" />
          <FileInput v-else :setTracks="setTracks" />
        </Column>
    </Stage>`,
  mounted: function () {

  },
  methods: {
    test: function () {
      this.lfm.track.getInfo(
        {
          artist: "Poliça",
          track: "Wandering Star"
        },
        function (err, track) {
          if (err) {
            throw err;
          }
          console.log(track);
        }
      );
    },
    setTracks: function(tracks){
      this.tracks = tracks;
    }
  }
};