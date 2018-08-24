export default {
    data: () => ({
        file: null,
        fileContent: null
    }),
    watch: {
        file: function(file) {
            const that = this;
            if (file) {
                const fr = new FileReader();
                fr.readAsText(file);
                fr.onload = function (e) {
                    that.fileContent = fr.result;
                };
            }
        },
        fileContent: function(fileContent){
            const rows = fileContent.split(/\r?\n/);
            console.log(rows)
        }
    },
    template: /*html*/ `<div class="file is-boxed is-centered">
        <label class="file-label">
            <input class="file-input" @change="processFile" type="file" name="resume">
            <span class="file-cta">
            <span class="file-icon">
                <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
                Choose .scrobbler.log file
            </span>
            </span>
        </label>
    </div>`,
    methods: {
        processFile(e){
            this.file = e.target.files[0]
        }
    }
}