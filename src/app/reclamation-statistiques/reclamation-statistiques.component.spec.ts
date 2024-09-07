import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationStatistiquesComponent } from './reclamation-statistiques.component';

describe('ReclamationStatistiquesComponent', () => {
  let component: ReclamationStatistiquesComponent;
  let fixture: ComponentFixture<ReclamationStatistiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationStatistiquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationStatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
