// import {apiKey} from '@/lastfm.json';

import StartAuth from '@/components/auth/StartAuth'
import AppStage from './AppStage';
import MainArea from '@/components/MainArea';

const lastfmApiKey = process.env.LASTFM_API_KEY;

export default {
    name: 'Start',
    mixins: [
        StartAuth
    ],
    components: {
        AppStage,
        MainArea
    },
    data: function(){
        return {
            lastfmApiKey
        }
    },
    computed: {
        callbackUrl: function(){
            return location.origin + location.pathname;
        }
    },
    template: /*html*/ `<AppStage>
        <Navbar></Navbar>         
        <MainArea>
            <vs-button :href="'http://www.last.fm/api/auth/?api_key='+apiKey+'&cb='+callbackUrl"
                class="main-area__single-button"
                flat active circle size="large">
                Log in with Lastfm
            </vs-button>
        </MainArea>
    </AppStage>`
}