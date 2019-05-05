import { BaseViewModel } from './base-view-model.service';
import { MatTableDataSource } from '@angular/material';
import { BaseModel } from '../models/base.model';

export abstract class BaseSectionViewModel extends BaseViewModel {

  dataSource: MatTableDataSource<BaseModel>;
  saveButtonHidden: boolean;
  displayedColumns: Array<string>;

  get columnsToDisplay(): Array<string> {
    // tslint:disable-next-line:no-non-null-assertion
    return this.displayedColumns!.filter(x => x !== 'menu');
  }

  init() {
    super.init();
    this.loadData();
  }

  loadData() {
    this.dataService.getAll().subscribe(data => this.dataSource = new MatTableDataSource(data));
  }

  onNewButtonClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  edit(element: BaseModel) {
    this.router.navigate(['edit', element.id], { relativeTo: this.route });
  }

  remove(element: BaseModel) {
    this.dataService.remove(element.id).subscribe(() => null);
  }

}
