export default {
  props: ["vcentered"],
  template: /*html*/ `<div class="main-area container">
        <div class="main-area__contents">
          <slot></slot>
        </div>
    </div>`,
};