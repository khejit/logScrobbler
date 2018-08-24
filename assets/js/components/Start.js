import {apiKey} from '../../../lastfm.json';

import StartAuth from './auth/StartAuth'
import Stage from './Stage';

export default {
    name: 'Start',
    mixins: [
        StartAuth
    ],
    components: {
        Stage
    },
    data: function(){
        return {
            apiKey
        }
    },
    template: /*html*/ `<Stage>
        <Hero title="Log Scrobbler"></Hero>         
        <CenteredColumn>
            <a :href="'http://www.last.fm/api/auth/?api_key='+apiKey+'&cb=http://localhost:3000/'"
                class="button is-link is-medium">
                Log in with Lastfm
            </a>
        </CenteredColumn>
        <div class="pageloader" :class="{'is-active': loading}"></div>
    </Stage>`
}