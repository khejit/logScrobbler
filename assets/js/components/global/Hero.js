export default {
    props: ["title", "subtitle", "actions"],
    template: /*html*/ `<section class="hero is-primary">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-vcentered is-mobile">
                    <div class="column">
                        <h1 class="title">
                            {{title}}
                        </h1>
                        <h2 v-if="subtitle" class="subtitle">
                            {{subtitle}}
                        </h2>
                    </div>
                    <div v-if="actions" class="column">
                        <div class="buttons is-right">
                            <span v-for="action in actions" @click="action.function" class="button">{{action.text}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`,
};
