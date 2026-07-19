import type { ElementAttributes } from '../../types/component';

export default class BaseComponent {
  $parent: HTMLElement;
  $: HTMLElement;

  constructor(
    $target: HTMLElement,
    tag: string,
    attributes: ElementAttributes = {}
  ) {
    this.$parent = $target;
    const $ = document.createElement(tag);

    Object.entries(attributes).forEach(([fieldName, fieldValue]) => {
      if (fieldName === 'styles' && fieldValue && typeof fieldValue === 'object') {
        Object.entries(fieldValue as Record<string, string | number>).forEach(
          ([styleName, styleValue]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ($.style as any)[styleName] = styleValue;
          }
        );
        return;
      }

      if (fieldName === 'class' && typeof fieldValue === 'string') {
        $.classList.add(fieldValue);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ($ as any)[fieldName] = fieldValue;
    });

    this.$ = $;
    this.$parent.append(this.$);
  }

  bindEvent(): void {
    Object.entries(this).forEach(([fieldName, fieldValue]) => {
      if (!fieldName.startsWith('on')) return;
      if (typeof fieldValue !== 'function') return;
      const eventType = fieldName.slice(2).toLowerCase();
      this.$.addEventListener(eventType, fieldValue as EventListener);
    });
  }

  HTML(template: string): void;
  HTML($parent: HTMLElement, template: string): void;
  HTML($parentOrTemplate: HTMLElement | string, template?: string): void {
    let $parent: HTMLElement;
    let html: string;

    if (template === undefined) {
      $parent = this.$;
      html = $parentOrTemplate as string;
    } else {
      $parent = $parentOrTemplate as HTMLElement;
      html = template;
    }

    $parent.innerHTML = html;
  }

  addHTML(template: string): void;
  addHTML($parent: HTMLElement, template: string): void;
  addHTML($parentOrTemplate: HTMLElement | string, template?: string): void {
    let $parent: HTMLElement;
    let html: string;

    if (template === undefined) {
      $parent = this.$;
      html = $parentOrTemplate as string;
    } else {
      $parent = $parentOrTemplate as HTMLElement;
      html = template;
    }

    const $temp = document.createElement('div');
    $temp.innerHTML = html;
    $parent.append($temp);
  }
}
