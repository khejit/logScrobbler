export default {
    props: ['setTracks'],
    data: () => ({
        file: null,
        fileContent: null,
        isLoading: false
    }),
    watch: {
        file: function(file) {
            if (file) {
                this.isLoading = true;
                const fr = new FileReader();
                fr.readAsText(file);
                fr.onload = (e) => {
                    this.fileContent = fr.result;
                };
            }
        },
        fileContent: function(fileContent){
            if (fileContent) {
                this.parseAndSetTracks()
            }
        }
    },
    template: /*html*/ `<div class="file is-boxed is-centered element" :class="{'is-loading': isLoading}">
        <label class="file-label">
            <input class="file-input" @change="processFile" type="file" name="resume">
            <span class="file-cta">
                <span class="file-icon is-marginless">
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
        },
        encodeHtml(character){
            const element = document.createElement("div");
            element.innerHTML = character;
            return element.innerHTML;
        },
        parseAndSetTracks(){
            const newLineRegex = /\r?\n/,
                rowSeparatorEntity = '&#x9;'

            const rows = this.fileContent.split(newLineRegex),
                trackRows = rows.filter(row=>(row && row.charAt(0) != '#')),
                trackRowsParsed = trackRows.map(rowStr=>{
                    return rowStr.split(this.encodeHtml(rowSeparatorEntity));
                });
            
            setTimeout(()=>{
                this.setTracks(trackRowsParsed);
            }, 1000)
        }
    }
}