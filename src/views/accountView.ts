import View from './View';

class AccountView extends View {
  btnLogin = document.querySelector('.btn-login') as HTMLButtonElement | null;
  btnLogout = document.querySelector('.btn-logout') as HTMLButtonElement | null;

  accountInfoEl = document.querySelector(
    '.sidebar--account-info',
  ) as HTMLElement | null;
  profPicEl = document.querySelector('.prof-pic') as HTMLElement | null;
  greetingNameEl = document.querySelector(
    '.greeting-name',
  ) as HTMLElement | null;

  contentTitleEl = document.querySelector(
    '.content-title',
  ) as HTMLElement | null;
  contentDisplayEl = document.querySelector(
    '.content-display',
  ) as HTMLElement | null;
  btnAdd = document.querySelector('.btn-add') as HTMLButtonElement | null;

  sidebarNavEl = document.querySelector('.sidebar-nav') as HTMLElement | null;

  addHandlerLogin = (handler: () => void) => {
    this.btnLogin?.addEventListener('click', handler);
  };

  addHandlerLogout = (handler: () => void) => {
    this.btnLogout?.addEventListener('click', handler);
  };

  showAccountInfo = (name: string, photoURL: string) => {
    this.accountInfoEl && this._unhideEl(this.accountInfoEl);

    if (this.profPicEl) {
      this.profPicEl.setAttribute('src', photoURL);
    }

    if (this.greetingNameEl) {
      this.greetingNameEl.textContent = name;
    }
  };

  hideAccountInfo = () => {
    this.accountInfoEl && this._hideEl(this.accountInfoEl);
  };

  showMainContent = () => {
    if (this.contentDisplayEl) this.contentDisplayEl.textContent = '';

    this.contentTitleEl && this._unhideEl(this.contentTitleEl);
    this.sidebarNavEl && this._unhideEl(this.sidebarNavEl);
    this.btnAdd && this._unhideEl(this.btnAdd);

    this.btnLogout && this._unhideEl(this.btnLogout);
    this.btnLogin && this._hideEl(this.btnLogin);

    this._changeTitle('All tasks');
  };

  hideMainContent = () => {
    if (this.contentDisplayEl) {
      this.contentDisplayEl.innerHTML = '';
      this.contentDisplayEl.textContent =
        'You must be signed in to use the app';
    }

    this.contentTitleEl && this._hideEl(this.contentTitleEl);
    this.sidebarNavEl && this._hideEl(this.sidebarNavEl);
    this.btnAdd && this._hideEl(this.btnAdd);

    this.btnLogin && this._unhideEl(this.btnLogin);
    this.btnLogout && this._hideEl(this.btnLogout);
  };
}

export default new AccountView();
