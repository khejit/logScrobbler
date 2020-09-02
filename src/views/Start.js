import {apiKey} from '@/lastfm.json';

import StartAuth from '@/components/auth/StartAuth'
import AppStage from './AppStage';
import MainArea from '@/components/MainArea'

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
            apiKey
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
            <a :href="'http://www.last.fm/api/auth/?api_key='+apiKey+'&cb='+callbackUrl"
                class="button is-link is-medium">
                Log in with Lastfm
            </a>
        </MainArea>
    </AppStage>`
}