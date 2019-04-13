import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store';
import { StoreType } from '../../enums/store-type.enum';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css']
})
export class StorePageComponent implements OnInit {

  form: FormGroup;
  id: string;
  store: Store;
  storeTypes: Array<{ name: string, value: string }> = [
    { value: StoreType.Department.toString(), name: 'Department' },
    { value: StoreType.BigBox.toString(), name: 'Big-Box' },
    { value: StoreType.Special.toString(), name: 'Special' },
    { value: StoreType.Discount.toString(), name: 'Discount' },
    { value: StoreType.ECommerce.toString(), name: 'E-Commerce' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadStore(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: null,
      type: null,
      status: null,
      phone: null,
      address: null,
    });
  }

  save() {
    if (this.id) {
      this.storeService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.storeService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`stores/edit/${id}`)
      );
  }

  loadStore(id: string) {
    this.storeService.getById(id).subscribe(store => {
      this.store = store;
      this.form.patchValue(store);
    });
  }

}
