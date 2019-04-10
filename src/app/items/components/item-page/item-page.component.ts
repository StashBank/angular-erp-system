import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.createForm();
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
    this.itemService.createItem(this.form.value)
      .subscribe(
        item => this.router.navigate(['..', 'edit', item.id], { relativeTo: this.route })
      );
  }

}
