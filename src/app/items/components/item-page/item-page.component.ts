import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { ItemType } from '../../enums/item-type.enum';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  form: FormGroup;
  id: string;
  item: Item;
  itemTypes: Array<{ name: string, value: string }> = [
    { value: ItemType.Goods.toString(), name: 'Goods' },
    { value: ItemType.Services.toString(), name: 'Services' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadItem(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: null,
      barCode: null,
      type: null,
      description: null,
      price: [0, [Validators.min(0.001)]],
      image: null
    });
  }

  save() {
    if (this.id) {
      this.itemService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.itemService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`items/edit/${id}`)
      );
  }

  loadItem(id: string) {
    this.itemService.getById(id).subscribe(item => {
      this.item = item;
      this.form.patchValue(item);
    });
  }

}
