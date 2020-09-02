import includes from "lodash/includes";
import startsWith from "lodash/startsWith";

export default {
  template: /*html*/ `<vs-table>
        <template #header>
          <vs-input v-model="search" border placeholder="Search" />
        </template>
        <template #thead>
            <vs-tr>
                <vs-th v-for="(title, key) in headings" :key="key"
                sort @click="handleSort($event, title)">
                    {{title | capitalize}}
                </vs-th>
            </vs-tr>
        </template>
        <template #tbody>
            <vs-tr
                :key="i"
                v-for="(track, i) in $vs.getSearch(tracks, search)"
                :data="track">
                <template v-for="(prop, key) in track">
                    <vs-td v-if="key==='accepted'">
                        <vs-checkbox :value="prop" :checked="prop" @change="handleAccepted(track)" />
                    </vs-td>
                    <vs-td v-else-if="(key!=='timestamp' && !startsWith(key, 'vs'))">{{prop}}</vs-td>
                </template>
            </vs-tr>
        </template>
    </vs-table>`,
  props: ["headings", "tracks", "handleAccepted", "handleSort"],
  data() {
    return {
      search: "",
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    includes(...args) {
      return includes(...args);
    },
    startsWith(...args) {
      return startsWith(...args);
    },
  },
};
