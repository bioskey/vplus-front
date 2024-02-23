import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTravelerComponent } from './search-traveler.component';

describe('SearchTravelerComponent', () => {
  let component: SearchTravelerComponent;
  let fixture: ComponentFixture<SearchTravelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTravelerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
