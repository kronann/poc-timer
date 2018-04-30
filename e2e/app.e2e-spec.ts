import { PocTimerPage } from './app.po';

describe('poc-timer App', () => {
  let page: PocTimerPage;

  beforeEach(() => {
    page = new PocTimerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
