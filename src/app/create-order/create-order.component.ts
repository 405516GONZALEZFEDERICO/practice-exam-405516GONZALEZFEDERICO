import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';
import { inject } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {

private readonly apiService = inject(ApiServiceService);
products: Product[]=[];
orderForm:FormGroup=new FormGroup({
customerName:new FormControl('',[Validators.required,Validators.minLength(3)]),
email:new FormControl('',[Validators.required,Validators.email]),

products:new FormArray([],[Validators.required])
});

ngOnInit(): void {
  this.loadProducts();
  }
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
  productForm.get('productId')?.valueChanges.subscribe( id=>{
    const product= this.products.find(p=>p.id==id);
    if(product){
      productForm.patchValue({
        price:product.price,
        stock:product.stock
      });
      const quantityControl= productForm.get('quantity');
      quantityControl?.setValidators([Validators.required,Validators.min(1),Validators.max(product.stock)])
    }
  });


  this.productsFormArray.push(productForm); 
}
removeProduct(index:number){
  this.productsFormArray.removeAt(index);
}


private loadProducts():void{
  this.apiService.getProducts().subscribe({
    next:(data)=>{
      this.products=data;
    },
    error:()=>{
      alert('error al cargar producto');
    }
  })
  
}
}
