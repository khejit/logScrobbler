import moment from "moment";
import Scrobbler from "@/components/scrobbler/Scrobbler";
import TracksTable from "@/components/TracksTable";
import forIn from "lodash/forIn";

export default {
  name: "Manager",
  props: ["initialTracks", "lfm"],
  components: { Scrobbler, TracksTable },
  template: /*html*/ `<div class="manager">
      <vs-row>
        <vs-col offset="1" w="10">
          <tracks-table :headings="trackHeadings" :tracks="tracks" :changeTrackAcceptedState="changeTrackAcceptedState" :sortTracks="sortTracks" />
            <Scrobbler :lfm="lfm" :tracks="tracks.filter(track=>track.accepted === true)" />
        </vs-col>
      </vs-row>
    </div>
    `,
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  computed: {
    tracks(){
      return this.$store.state.tracks;
    }
  },
  data: function() {
    return {
      trackHeadings: [
        "artist",
        "album",
        "track",
        "trackNum",
        "length",
        "accepted",
        "time",
      ]
    };
  },
  mounted: function() {
    this.$store.dispatch('setTracks', this.formatTracks(this.initialTracks));
  },
  methods: {
    formatSecondsString: (time) => {
      const minutes = Math.floor(time / 60),
        seconds = ("0" + (time % 60)).slice(-2); // https://stackoverflow.com/a/8043061
      return `${minutes}:${seconds}`;
    },
    getTrackTimeFormatted: (timestamp) => {
      return moment.unix(timestamp).format("DD.MM HH:mm");
    },
    changeTrackAcceptedState: (track) => {
      track.accepted = !track.accepted;
    },
    sortTracks(event, title) {
      this.$store.dispatch('setTracks', this.$vs.sortData(event, this.tracks, title));
    },
    formatTracks(tracks) {
      return tracks.map((track, index) => {
        let formattedTrack = {};

        forIn(this.trackHeadings, (heading, hIndex) => {
          switch (heading) {
            case "length":
              formattedTrack[heading] = this.formatSecondsString(
                track[hIndex]
              );
              break;
            case "accepted":
              formattedTrack[heading] = !!track[hIndex];
              break;
            case "time":
              const timestamp = parseInt(track[hIndex]);
              formattedTrack["timestamp"] = timestamp;
              formattedTrack[heading] = this.getTrackTimeFormatted(timestamp);
              break;
            default:
              formattedTrack[heading] = track[hIndex];
          }
        });

        return formattedTrack;
      });
    },
  },
};
