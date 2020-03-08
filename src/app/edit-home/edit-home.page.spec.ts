import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditHomePage } from './edit-home.page';

describe('EditHomePage', () => {
  let component: EditHomePage;
  let fixture: ComponentFixture<EditHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
