import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with display as 0', () => {
    expect(component.display).toEqual('0');
  });

  it('should update display when a number is clicked', () => {
    component.onNumberClick('5');
    expect(component.display).toEqual('5');
  });

  it('should handle division by zero', () => {
    component.onNumberClick('8');
    component.onOperatorClick('/');
    component.onNumberClick('0');
    component.onEqualsClick();
    expect(component.display).toEqual('Infinity');
  });

  it('should append numbers correctly', () => {
    component.onNumberClick('1');
    component.onNumberClick('2');
    component.onNumberClick('3');
    expect(component.display).toEqual('123');
  });

  it('should reset state after clearing following an equals operation', () => {
    component.onNumberClick('8');
    component.onOperatorClick('+');
    component.onNumberClick('2');
    component.onEqualsClick();
    component.onClearClick();
    expect(component.display).toEqual('0');
    expect(component.firstOperand).toBeNull();
    expect(component.currentOperator).toEqual('');
  });

  it('should update display when operator is clicked', () => {
    component.onNumberClick('4');
    component.onOperatorClick('+');
    expect(component.display).toEqual('4 + ');
  });

  it('should perform addition operation correctly', () => {
    component.onNumberClick('5');
    component.onOperatorClick('+');
    component.onNumberClick('3');
    component.onEqualsClick();
    expect(component.display).toEqual('8');
  });

  it('should perform subtraction operation correctly', () => {
    component.onNumberClick('9');
    component.onOperatorClick('-');
    component.onNumberClick('3');
    component.onEqualsClick();
    expect(component.display).toEqual('6');
  });

  it('should perform multiplication operation correctly', () => {
    component.onNumberClick('7');
    component.onOperatorClick('*');
    component.onNumberClick('6');
    component.onEqualsClick();
    expect(component.display).toEqual('42');
  });

  it('should perform division operation correctly', () => {
    component.onNumberClick('8');
    component.onOperatorClick('/');
    component.onNumberClick('2');
    component.onEqualsClick();
    expect(component.display).toEqual('4');
  });

  it('should clear display when C is clicked', () => {
    component.onNumberClick('9');
    component.onClearClick();
    expect(component.display).toEqual('0');
  });

  it('should clear display when CE is clicked', () => {
    component.onNumberClick('8');
    component.onClearClick();
    expect(component.display).toEqual('0');
  });

  it('should handle decimal input correctly', () => {
    component.onNumberClick('7');
    component.onDecimalClick();
    component.onNumberClick('5');
    expect(component.display).toEqual('7.5');
  });

  it('should handle backspace correctly', () => {
    component.onNumberClick('9');
    component.onNumberClick('5');
    component.backspace();
    expect(component.display).toEqual('9');
  });

  it('should handle multiple operations correctly', () => {
    component.onNumberClick('10');
    component.onOperatorClick('+');
    component.onNumberClick('20');
    component.onOperatorClick('-');
    component.onNumberClick('5');
    component.onEqualsClick();
    expect(component.display).toEqual('25');
  });

  it('should handle starting with an operator gracefully', () => {
    component.onOperatorClick('+');
    expect(component.display).toEqual('0 + ');
  });

  it('should replace the previous operator if a new one is clicked without equals', () => {
    component.onNumberClick('5');
    component.onOperatorClick('+');
    component.onOperatorClick('-');
    expect(component.display).toEqual('5 - ');
  });


  it('should not allow multiple leading zeros', () => {
    component.onNumberClick('0');
    component.onNumberClick('0');
    expect(component.display).toEqual('0');
  });

  it('should handle subtraction to create negative numbers', () => {
    component.onNumberClick('3');
    component.onOperatorClick('-');
    component.onNumberClick('5');
    component.onEqualsClick();
    expect(component.display).toEqual('-2');
  });

  it('should handle consecutive equals clicks correctly', () => {
    component.onNumberClick('4');
    component.onOperatorClick('+');
    component.onNumberClick('6');
    component.onEqualsClick();
    component.onEqualsClick();
    expect(component.display).toEqual('16');
  });
});



