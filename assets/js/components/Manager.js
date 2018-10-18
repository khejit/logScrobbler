import Scrobbler from './scrobbler/Scrobbler';

const moment = window.moment;

export default {
    name: 'Manager',
    props: ['initialTracks', 'lfm'],
    components: {Scrobbler},
    template: /*html*/ `<div class="table-container container">
        <table class="table is-striped tracks-table">
            <thead>
                <tr>
                    <th v-for="title in trackHeadings">{{title | capitalize}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="track in tracks">
                    <template v-for="(prop, key) in track">
                        <td v-if="key==='accepted'">
                            <div class="field" @click="handleAccepted(track)">
                                <input class="is-checkradio" type="checkbox" :checked="prop">
                                <label></label>
                            </div>
                        </td>
                        <td v-else-if="key!=='timestamp'">{{prop}}</td>
                    </template>
                </tr>
            </tbody>
        </table>
        <div class="buttons is-right">
            <Scrobbler :lfm="lfm" :tracks="tracksFormatted.filter(track=>track.accepted === true)" />
        </div>
    </div>
    `,
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    data: function () {
        return {
            trackHeadings: [
                'artist',
                'album',
                'track',
                'track num',
                'length',
                'accepted',
                'time'
            ],
            tracks: []
        }
    },
    mounted: function () {
        this.tracks = this.tracksFormatted;
    },
    computed: {
        tracksFormatted() {
            return this.initialTracks.map((track, index) => {
                let formattedTrack = {};
                this.trackHeadings.forEach((heading, hIndex) => {
                    switch (heading) {
                        case 'length':
                            formattedTrack[heading] = this.secondsToMinutesString(track[hIndex]);
                            break;
                        case 'accepted':
                            formattedTrack[heading] = !!track[hIndex];
                            break;
                        case 'time':
                            const unshiftedTimestamp = track[hIndex],
                                shiftedTimestamp = unshiftedTimestamp - 7200;
                            formattedTrack['timestamp'] = shiftedTimestamp;
                            formattedTrack[heading] = this.getTrackTimeFormatted(shiftedTimestamp);
                            break;
                        default:
                            formattedTrack[heading] = track[hIndex];
                    }
                })
                return formattedTrack;
            })
        }
    },
    methods: {
        secondsToMinutesString: (time) => {
            const minutes = Math.floor(time / 60),
                seconds = time % 60;
            return `${minutes}:${seconds}`;
        },
        getTrackTimeFormatted: (timestamp) => {
            return moment.unix(timestamp).format('DD.MM HH:mm');
        },
        handleAccepted: (track) => {
            track.accepted = !track.accepted;
        }
    }
}