import {apiKey} from '../../../lastfm.json';

import StartAuth from './auth/StartAuth'
import Hero from './Hero';
import Stage from './Stage';

export default {
    name: 'Start',
    mixins: [
        StartAuth
    ],
    components: {
        Hero,
        Stage
    },
    data: function(){
        return {
            apiKey
        }
    },
    template: /*html*/ `<Stage>
        <Hero title="Log Scrobbler"></Hero>         
        <div class="columns is-vcentered is-marginless f-grow">
            <div class="column has-text-centered">
                <a :href="'http://www.last.fm/api/auth/?api_key='+apiKey+'&cb=http://localhost:3000/'"
                    class="button is-link is-medium">
                    Log in with Lastfm
                </a>
            </div>
        </div>
        <div class="pageloader" :class="{'is-active': loading}"></div>
    </Stage>`
}