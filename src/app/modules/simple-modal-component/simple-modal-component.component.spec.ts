import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleModalComponentComponent } from './simple-modal-component.component';

describe('SimpleModalComponentComponent', () => {
  let component: SimpleModalComponentComponent;
  let fixture: ComponentFixture<SimpleModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleModalComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
