// Build a Mortgage Claculator using Rxjs and calculateMortgage method

import { fromEvent, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { calculateMortgage } from './calculate';
import { Loan } from './loanModel';

let loanModel: Loan = {};

let loanAmountInput: HTMLInputElement;
let loanInterestInput: HTMLInputElement;
let loanLengthInput: HTMLInputElement;
let loanResult: HTMLDivElement;

loanAmountInput = document.getElementById('loanAmount') as HTMLInputElement;
loanInterestInput = document.getElementById('loanInterest') as HTMLInputElement;
loanLengthInput = document.getElementById('loanLength') as HTMLInputElement;
loanResult = document.getElementById('result') as HTMLDivElement;

let loanAmountChange$: Observable<InputEvent>;
let loanInterestChange$: Observable<InputEvent>;
let loanLengthChange$: Observable<InputEvent>;

loanAmountChange$ = fromEvent<InputEvent>(loanAmountInput, 'input');
loanInterestChange$ = fromEvent<InputEvent>(loanInterestInput, 'input');
loanLengthChange$ = fromEvent<InputEvent>(loanLengthInput, 'input');

loanAmountChange$
  .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
  .subscribe(loanAmount => {
    loanModel.loanAmount = loanAmount;
  });

loanInterestChange$
  .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
  .subscribe(loanInterest => {
    loanModel.loanInterest = loanInterest;
  });

loanLengthChange$
  .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
  .subscribe(loanLength => {
    loanModel.loanLength = loanLength;
  });

function getValueFromInputEvent(
  event: Observable<InputEvent>
): Observable<string> {
  return event.pipe(
    map((event: InputEvent) => (event.target as HTMLInputElement).value)
  );
}

loanAmountChange$.pipe(getValueFromInputEvent).subscribe(loanAmount => {
  loanModel.loanAmount = loanAmount;
});

loanInterestChange$.pipe(getValueFromInputEvent).subscribe(loanInterest => {
  loanModel.loanInterest = loanInterest;
});

loanLengthChange$.pipe(getValueFromInputEvent).subscribe(loanLength => {
  loanModel.loanLength = loanLength;
  let result = calculateMortgage(
    loanModel.loanInterest,
    loanModel.loanAmount,
    loanModel.loanLength
  );
  loanResult.innerHTML = result;
});
