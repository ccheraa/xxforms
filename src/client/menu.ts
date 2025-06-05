import { XXForms } from "./xxforms";

const MENU_MARGIN = 10;

function positionMenu(menuEl: HTMLElement, x: number, y: number) {
  if (x + MENU_MARGIN + menuEl.clientWidth > window.innerWidth) {
    x = window.innerWidth - menuEl.clientWidth - MENU_MARGIN;
    menuEl.classList.add('reversed');
  } else {
    menuEl.classList.remove('reversed');
  }
  if (y - MENU_MARGIN + menuEl.clientHeight > window.innerHeight) {
    y = window.innerHeight - menuEl.clientHeight - MENU_MARGIN;
    menuEl.classList.add('v-reversed');
  } else {
    menuEl.classList.remove('v-reversed');
  }
  menuEl.style.left = `${x}px`;
  menuEl.style.top = `${y}px`;
}

export default class XXMenu {
  constructor(private forms: XXForms) {}
  closeAll() {
    document.querySelectorAll('.xx-menu.open').forEach(menu => menu.classList.remove('open'));
    document.querySelectorAll('.xx-button.xx-button-posistioned').forEach(menu => menu.classList.remove('xx-button-posistioned'));
  }
  menuClick(event: MouseEvent) {
    let target = event.target as HTMLElement;
    while (target) {
      if (target.classList.contains('xx-menu')) {
        if (target.classList.contains('open')) {
          this.closeAll();
        } else {
          this.closeAll();
          target.classList.toggle('open');
        }
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      target = target.parentElement as HTMLElement;
    }
    this.closeAll();
  }
  mouseDown(event: MouseEvent) {
    if (event.button !== 2) {
      return;
    }
    let target = event.target as HTMLElement;
    while (target) {
      if (target.classList.contains('xx-menu-trigger')) {
        const menuEl = document.getElementById(target.getAttribute('for')!);
        if (menuEl) {
          this.closeAll();
          menuEl.classList.add('open');
          positionMenu(menuEl, event.clientX, event.clientY);
          event.stopPropagation();
          event.preventDefault();
          return;
        }
      }
      target = target.parentElement as HTMLElement;
    }
  }
  ready() {
    document.addEventListener('click', this.menuClick.bind(this));
    document.addEventListener('contextmenu', this.mouseDown.bind(this));
  }
}