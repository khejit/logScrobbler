export default {
    props: ["title", "subtitle"],
    template: /*html*/ `<section class="hero is-primary">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    {{title}}
                </h1>
                <h2 v-if="subtitle" class="subtitle">
                    {{subtitle}}
                </h2>
            </div>
        </div>
    </section>`,
};
