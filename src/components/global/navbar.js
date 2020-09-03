import { colorDanger as buttonColor } from "@/vars";

export default {
  props: ["title", "subtitle", "actions"],
  template: /*html*/ `<vs-navbar class="navbar" square center-collapsed>
        <template #left>
          <img class="logo" :src="publicPath+'logo.svg'" alt="Logo" />
        </template>
        
        <v-centered-text><h4 class="navbar__logged-info">{{title}}<span v-if="subtitle"> {{subtitle}}</span></h4></v-centered-text>
        
        <template #right>
          <div class="navbar__actions actions" v-if="actions">
            <vs-button class="actions__logout" style="margin-left: 1rem;" circle border :color="buttonColor" v-for="action in actions" :key="action.text" @click="action.function">{{action.text}}
              <i class="bx bx-log-out"></i>
            </vs-button>
          </div>
        </template>
    </vs-navbar>`,
  data() {
    return {
      buttonColor,
      publicPath: process.env.BASE_URL,
    };
  },
};
