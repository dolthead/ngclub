import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTabPage } from './events-tab.page';

describe('EventsTabPage', () => {
  let component: EventsTabPage;
  let fixture: ComponentFixture<EventsTabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(EventsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
