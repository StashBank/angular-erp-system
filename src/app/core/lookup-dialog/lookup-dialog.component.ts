import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LookupDataService } from './lookup-data.service';
import { take } from 'rxjs/operators';

export interface DialogData {
  collectionName: string;
  displayedColumns: Array<{path: string; title: string}>;
  filters?: any;
  result?: any;
}

@Component({
  selector: 'app-lookup-dialog',
  templateUrl: './lookup-dialog.component.html',
  styleUrls: ['./lookup-dialog.component.css'],
  providers: [
    LookupDataService
  ]
})
export class LookupDialogComponent implements OnInit {

  public itemList: Array<any>;

  get displayedColumns(): Array<string> {
    const res = [ ...this.data.displayedColumns.map(c => c.path), 'menu'];
    return res;
  }

  constructor(
    public dialogRef: MatDialogRef<LookupDialogComponent>,
    private lookupDataService: LookupDataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    lookupDataService.setCollectionName(data.collectionName);
  }

  ngOnInit() {
    this.lookupDataService.getAll().pipe(take(1)).subscribe(
      data => this.itemList = data
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(result) {
    this.data.result = result;
    this.dialogRef.close(result);
  }

}
