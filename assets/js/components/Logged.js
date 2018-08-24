import Scrobbler from './scrobbler/Scrobbler';
import LoggedAuth from './auth/LoggedAuth';
import Stage from './Stage';
import FileInput from './FileInput';

export default {
  name: 'Logged',
  mixins: [
    LoggedAuth
  ],
  components: {
    Scrobbler,
    Stage,
    FileInput
  },
  data: function () {
    return {

    };
  },
  computed: {
    username: function () {
      return this.session.username;
    }
  },
  template: /*html*/ `<Stage>
        <Hero title="Logged in as" :subtitle="username"></Hero>
        <CenteredColumn>
          <FileInput />
        </CenteredColumn>
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
  }
};