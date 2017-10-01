import { BondTestePage } from './app.po';

describe('bond-teste App', () => {
  let page: BondTestePage;

  beforeEach(() => {
    page = new BondTestePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
