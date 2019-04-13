import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit {

  form: FormGroup;
  id: string;
  transaction: Transaction;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadTransaction(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      type: null,
      status: null,
      from: null,
      to: null,
      order: null,
      date: null,
      qty: null
    });
  }

  save() {
    if (this.id) {
      this.transactionService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.transactionService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`transactions/edit/${id}`)
      );
  }

  loadTransaction(id: string) {
    this.transactionService.getById(id).subscribe(transaction => {
      this.transaction = transaction;
      this.form.patchValue(transaction);
    });
  }

}
