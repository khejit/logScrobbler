import moment from "moment";
import Scrobbler from "./scrobbler/Scrobbler";
import TracksTable from "./TracksTable";
import forIn from "lodash/forIn";
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Manager",
  props: ["initialTracks", "lfm"],
  components: { Scrobbler, TracksTable },
  template: /*html*/ `<div class="manager">
		<vs-row>
			<vs-col offset="1" w="10">
				<tracks-table :headings="trackHeadings" :tracks="tracks" :handleAccepted="handleAccepted" :handleSort="handleSort" />
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
      ],
      tracks: [],
    };
  },
  mounted: function() {
    this.tracks = this.formatTracks(this.initialTracks);
  },
  methods: {
    secondsToMinutesString: (time) => {
      const minutes = Math.floor(time / 60),
        seconds = ("0" + (time % 60)).slice(-2); // https://stackoverflow.com/a/8043061
      return `${minutes}:${seconds}`;
    },
    getTrackTimeFormatted: (timestamp) => {
      return moment.unix(timestamp).format("DD.MM HH:mm");
    },
    handleAccepted: (track) => {
      track.accepted = !track.accepted;
    },
    handleSort(event, title) {
      this.tracks = this.$vs.sortData(event, this.tracks, title);
    },
    formatTracks(tracks) {
      return tracks.map((track, index) => {
        let formattedTrack = {};

        forIn(this.trackHeadings, (heading, hIndex) => {
          switch (heading) {
            case "length":
              formattedTrack[heading] = this.secondsToMinutesString(
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
