export default {
    props: ['fit'],
    template: /*html*/ `<div class="main-container" :class="{fit: fit}">
        <slot></slot>
    </div>`
}