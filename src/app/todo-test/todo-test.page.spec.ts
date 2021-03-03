import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoTestPage } from './todo-test.page';

describe('TodoTestPage', () => {
  let component: TodoTestPage;
  let fixture: ComponentFixture<TodoTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
