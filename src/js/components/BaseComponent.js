export default class BaseComponent {
  constructor($target, tag, attributes) {
    this.$parent = $target;
    const $ = document.createElement(tag);
    Object.entries(attributes).forEach(([fieldName, fieldValue]) => {
      if (fieldName === 'styles') {
        Object.entries(fieldValue).forEach(([styleName, styleValue]) => {
          $.style[styleName] = styleValue;
        });
      }
      if (fieldName === 'class') {
        $.classList.add(fieldValue);
      } else {
        $[fieldName] = fieldValue;
      }
    });
    this.$ = $;
    this.$parent.append(this.$);
  }

  bindEvent() {
    console.log(this);
    Object.entries(this).forEach(([fieldName, fieldValue]) => {
      if (fieldName.indexOf('on') !== 0) return;
      const eventType = fieldName.slice(2).toLowerCase();
      this.$.addEventListener(eventType, fieldValue);
    });
  }

  HTML($parent, template) {
    if (!template) {
      template = $parent;
      $parent = this.$;
    }
    $parent.innerHTML = template;
  }

  addHTML($parent, template) {
    if (!template) {
      template = $parent;
      $parent = this.$;
    }
    const $temp = document.createElement('div');
    $temp.innerHTML = template;
    $parent.append($temp);
  }
}
