import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {

orderForm:FormGroup=new FormGroup({
customerName:new FormControl('',[Validators.required,Validators.minLength(3)]),
email:new FormControl('',[Validators.required,Validators.email]),

products:new FormArray([],[Validators.required])
});

get productsFormArray() {
  return this.orderForm.get('products') as FormArray;
}

addProduct(){
  const productForm:FormGroup= new FormGroup({
    price:new FormControl(),
    productId:new FormControl(''),
    quantity:new FormControl(1),
    stock:new FormControl(0)
  });
  this.productsFormArray.push(productForm); 
}
removeProduct(index:number){
  this.productsFormArray.removeAt(index);
}
}
