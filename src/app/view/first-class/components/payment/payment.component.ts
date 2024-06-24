import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  /* pay Cases */

  active1 = true;
  active2 = false;
  active3 = false;
  active4 = false;
  case1() {
    this.active1 = true;
    this.active2 = false;
    this.active3 = false;
    this.active4 = false;
  }
  case2() {
    this.active1 = false;
    this.active2 = true;
    this.active3 = false;
    this.active4 = false;
  }
  case3() {
    this.active1 = false;
    this.active2 = false;
    this.active3 = true;
    this.active4 = false;
  }
  case4() {
    this.active1 = false;
    this.active2 = false;
    this.active3 = false;
    this.active4 = true;
  }
  opinionForm!: FormGroup;
  openSubmitted = false;
  showError = false;
  creditForm!: FormGroup;
  creditSubmitted = false;
  walletForm!: FormGroup;
  walletSubmitted = false;
  tamaraForm!: FormGroup;
  tamaraSubmitted = false;
  secondStep: boolean = true;
  thirdStep: boolean = false;
  CouponForm!: FormGroup;
  CouponSubmitted = false;
  receiptForm!: FormGroup;
  showCards = false;
  receiptSubmitted = false;
  defaultImagePath: string = '../../../../../assets/images/defalut.png';
  logoPreview: string = this.defaultImagePath;
  selectedFile!: File;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.CouponForm = this.fb.group({
      coupon: ['', [Validators.required]],
    });
    this.receiptForm = this.fb.group({
      money: ['', [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  /* Steps */

  submitOpinion() {
    this.showError = true;
    if (this.opinionForm.valid) {
      console.log(this.opinionForm.value);
      this.openSubmitted = true;
      this.showError = false;
    }
  }

  discountSubmit() {
    this.CouponSubmitted = true;
    if (!this.CouponForm.invalid) {
      console.log(this.CouponForm.value);
      this.CouponSubmitted = false;
    }
  }
  receiptSubmit() {
    this.receiptSubmitted = true;
    if (!this.receiptForm.invalid) {
      console.log(this.receiptForm.value);
      this.receiptSubmitted = false;
    }
  }
  walletSubmit() {
    this.walletSubmitted = true;
    if (!this.walletForm.invalid) {
      this.secondStep = false;
      this.thirdStep = true;
      console.log(this.walletForm.value);
      this.walletSubmitted = false;
    }
  }
  tamaraSubmit() {
    this.tamaraSubmitted = true;
    if (!this.tamaraForm.invalid) {
      this.secondStep = false;
      this.thirdStep = true;
      console.log(this.tamaraForm.value);
      this.tamaraSubmitted = false;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.logoPreview = reader.result as string;
      console.log('logo selectedFile', this.selectedFile);
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
