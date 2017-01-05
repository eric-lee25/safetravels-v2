import { SafetravelsPage } from './app.po';

describe('safetravels App', function() {
  let page: SafetravelsPage;

  beforeEach(() => {
    page = new SafetravelsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
