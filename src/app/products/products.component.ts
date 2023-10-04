import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import Swal from 'sweetalert2';
import {AuthentificationService} from "../services/authentification.service";

// CommonJS

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>;
  errorMessage! : string ;
  searchFormGroup! : FormGroup;
constructor(private productService : ProductService , private fb : FormBuilder ,
            public authService : AuthentificationService
            ) { }

  ngOnInit(): void {
  this.searchFormGroup=this.fb.group( {keyword : this.fb.control(null)});

    this.handleGetAllProducts()
  }
  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({next: (data)=>{
        this.products=data ;
      },
      error : (err)=> {
        this.errorMessage=err;
      }

    });
  }

  handleDeleteProduct(p: any) {

 let conf=   Swal.fire({
   title: 'Are you sure?',
   text: "You won't be able to revert this!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then((result) => {
   if (result.isConfirmed) {
     Swal.fire(
       'Deleted!',
       'Your file has been deleted.',
       'success'

     )
     this.productService.deleteProduct(p.id).subscribe( {
       next : (data )=>{
         //this.handleGetAllProducts();
         let index=this.products.indexOf(p);
         this.products.splice(index,1);
         //yass

       }
     });
   }
 })                                                                 //confirm("Are you sure?");
   // if (!conf) return ;

  }

    handleSetPromotion(p: Product) {
  let promo=p.promotion;
      this.productService.setPromotion(p.id).subscribe( {
          next :( data  )=>{
            p.promotion=!promo ;
        },
          error : err => {
            this.errorMessage=err ;
          }
      })

    }

  handleSearchProducts() {
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.seachProducts(keyword).subscribe( {
      next :(data)=> {
        this.products=data;
      }
    })
  }
}
