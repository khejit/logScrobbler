export default {
  props: ["callback"],
  data: () => ({
    file: null,
    fileContent: null
  }),
  watch: {
    file: function(file) {
      if (file) {
        this.$store.dispatch('setLoading', true);
        const fr = new FileReader();
        fr.readAsText(file);
        fr.onload = (e) => {
          this.fileContent = fr.result;
        };
      }
    },
    fileContent: function(fileContent) {
      if (fileContent) {
        this.parseAndCallback();
      }
    },
  },
  template: /*html*/ `<label class="file-input">
        <input @change="processFile" type="file" id="scrobbler-log-file-input" name="scrobbler-log" aria-label=".scrobbler.log file input">
        <span data-text="Choose .scrobbler.log file"></span>
    </label>`,
  methods: {
    processFile(e) {
      this.file = e.target.files[0];
    },
    encodeHtml(character) {
      const element = document.createElement("div");
      element.innerHTML = character;
      return element.innerHTML;
    },
    parseAndCallback() {
      const newLineRegex = /\r?\n/,
        rowSeparatorEntity = "&#x9;";

      const rows = this.fileContent.split(newLineRegex),
        trackRows = rows.filter((row) => row && row.charAt(0) != "#"),
        trackRowsParsed = trackRows.map((rowStr) => {
          return rowStr.split(this.encodeHtml(rowSeparatorEntity));
        });

      // timeout just to have pretty loader for a moment, can as well be deleted
      setTimeout(() => {
        this.$store.dispatch('setLoading', false);
        this.callback(trackRowsParsed);
      }, 700);
    },
  },
};
