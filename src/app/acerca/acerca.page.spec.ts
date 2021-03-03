import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcercaPage } from './acerca.page';

describe('AcercaPage', () => {
  let component: AcercaPage;
  let fixture: ComponentFixture<AcercaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcercaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcercaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
