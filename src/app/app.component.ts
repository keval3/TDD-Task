import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-TDD';

  display: string = '0';
  currentOperator: string = '';
  lastOperator: string = '';
  firstOperand: any = null;
  lastOperand: any = null;
  waitingForSecondOperand: boolean = false;

  onNumberClick(number: string) {
    if (this.waitingForSecondOperand) {
      this.display = number;
      this.waitingForSecondOperand = false;
    } else {
      this.display = this.display === '0' ? number : this.display + number;
    }
  }

  onOperatorClick(operator: string) {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.display);
    } else if (this.currentOperator) {
      if (this.waitingForSecondOperand) {
        this.display = this.display.slice(0, -3);
      } else {
        this.firstOperand = this.performCalculation(this.currentOperator, this.firstOperand, parseFloat(this.display));
        this.display = `${this.firstOperand}`;
      }
    }

    this.currentOperator = operator;
    this.display += ` ${operator} `;
    this.waitingForSecondOperand = true;
  }

  onEqualsClick() {
    if (this.currentOperator) {
      if (this.waitingForSecondOperand) {
        return;
      }
      const secondOperand = parseFloat(this.display);
      this.firstOperand = this.performCalculation(this.currentOperator, this.firstOperand, secondOperand);
      this.display = `${this.firstOperand}`;

      this.lastOperator = this.currentOperator;
      this.lastOperand = secondOperand;

      this.currentOperator = '';
      this.waitingForSecondOperand = true;
    } else if (this.lastOperator) {
      this.firstOperand = this.performCalculation(this.lastOperator, this.firstOperand, this.lastOperand);
      this.display = `${this.firstOperand}`;
    }
  }

  onClearClick() {
    this.display = '0';
    this.firstOperand = null;
    this.currentOperator = '';
    this.waitingForSecondOperand = false;
  }

  performCalculation(operator: string, firstOperand: number, secondOperand: number): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  backspace() {
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0'
    }
  }

  onDecimalClick() {
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }
}
