export default {
    props: ['vcentered'],
    template: /*html*/`<div class="columns is-marginless f-grow" :class="{'is-vcentered': vcentered}">
            <div class="column has-text-centered">
                <slot></slot>
            </div>
        </div>`
}