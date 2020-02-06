import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuggestboxComponent } from './suggestbox.component';

describe('SuggestboxComponent', () => {
  let component: SuggestboxComponent;
  let fixture: ComponentFixture<SuggestboxComponent>;
  let data = [{login:'leshax', avatar_url:'http://url', score: '100'},
    {login:'leshax1', avatar_url:'http://url2', score: '101'}];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Dropdown should be populated with fetched data', () => {
    component.items = data;
    const ul = fixture.debugElement.query(By.css('ul'));
    fixture.detectChanges();
    expect(ul.properties.hidden).toEqual(false);
    expect(ul.children.length).toEqual(data.length);
  });

  it('Dropdown should be hidden after user click', () => {
    component.items.push(data);
    const parent = fixture.debugElement.query(By.css('input')).parent;
    const ul = fixture.debugElement.query(By.css('ul'));
    parent.nativeElement.click();
    fixture.detectChanges();
    expect(ul.properties.hidden).toEqual(true);
    expect(component.items.length).toEqual(0);
  });

  it("Dropdown should be hidden in case of empty search string provided ", () => {
    component.items.push(data);
    const ul = fixture.debugElement.query(By.css('ul'));
    component.fetch("");
    fixture.detectChanges();
    expect(ul.properties.hidden).toEqual(true);
    expect(component.items.length).toEqual(0);
  });
});
