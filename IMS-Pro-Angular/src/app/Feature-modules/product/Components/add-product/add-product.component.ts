import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
 form: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      this.productService.create(this.form.value).subscribe(() => {
        alert('Product saved!');
      });
    }
  }
}
