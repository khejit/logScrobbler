export default {
  props: ["setTracks", "setLoading"],
  data: () => ({
    file: null,
    fileContent: null
  }),
  watch: {
    file: function(file) {
      if (file) {
        this.setLoading(true);
        const fr = new FileReader();
        fr.readAsText(file);
        fr.onload = (e) => {
          this.fileContent = fr.result;
        };
      }
    },
    fileContent: function(fileContent) {
      if (fileContent) {
        this.parseAndSetTracks();
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
    parseAndSetTracks() {
      const newLineRegex = /\r?\n/,
        rowSeparatorEntity = "&#x9;";

      const rows = this.fileContent.split(newLineRegex),
        trackRows = rows.filter((row) => row && row.charAt(0) != "#"),
        trackRowsParsed = trackRows.map((rowStr) => {
          return rowStr.split(this.encodeHtml(rowSeparatorEntity));
        });

      setTimeout(() => {
        this.setLoading(false);
        this.setTracks(trackRowsParsed);
      }, 700);
    },
  },
};
