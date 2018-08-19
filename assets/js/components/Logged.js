import Scrobbler from './scrobbler/Scrobbler';
import LoggedAuth from './auth/LoggedAuth';
import Hero from './Hero';
import Stage from './Stage';

export default {
  name: 'Logged',
  mixins: [
    LoggedAuth
  ],
  components: {
    Scrobbler,
    Hero,
    Stage
  },
  data: function () {
    return {

    };
  },
  computed: {
    username: function(){
      return this.session.username;
    }
  },
  template: /*html*/ `<Stage>
        <Hero title="Logged in as" :subtitle="username"></Hero>         
        <div>
            <p>Chuj</p>
        </div>
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