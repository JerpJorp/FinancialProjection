import { FinancialProjectionPage } from './app.po';

describe('financial-projection App', function() {
  let page: FinancialProjectionPage;

  beforeEach(() => {
    page = new FinancialProjectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
