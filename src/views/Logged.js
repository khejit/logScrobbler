import Scrobbler from '@/components/scrobbler/Scrobbler';
import LoggedAuth from '@/components/auth/LoggedAuth';
import AppStage from './AppStage';
import FileInput from '@/components/FileInput';
import Manager from '@/components/Manager';
import MainArea from '@/components/MainArea';

export default {
  name: 'Logged',
  mixins: [
    LoggedAuth
  ],
  components: {
    Scrobbler,
    AppStage,
    FileInput,
    Manager,
    MainArea
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
  template: /*html*/ `<AppStage :fit="!tracks.length" v-slot="{setAppLoading}">
        <Navbar title="Logged in as" :subtitle="username" :actions="actions"></Navbar>
        <MainArea>
          <Manager v-if="tracks.length" :initialTracks="tracks" :lfm="lfm" />
          <FileInput v-else :setTracks="setTracks" :setAppLoading="setAppLoading" />
        </MainArea>
    </AppStage>`,
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