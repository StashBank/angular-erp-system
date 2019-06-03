import { BaseViewModel } from './base-view-model.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { BaseModel } from '../models/base.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseSectionViewModel extends BaseViewModel {

  dataSource: MatTableDataSource<BaseModel>;
  saveButtonHidden: boolean;
  displayedColumns: Array<string>;
  sort: MatSort;

  get columnsToDisplay(): Array<string> {
    // tslint:disable-next-line:no-non-null-assertion
    return this.displayedColumns!.filter(x => x !== 'menu');
  }

  get title(): Observable<string> {
    const caption = this.entitySchema && this.entitySchema.caption;
    return caption && this.translate && this.translate.get(caption);
  }


  init() {
    super.init();
    this.loadData();
  }

  loadData() {
    this.dataService.getAll()
    .pipe(
      map(
        data => Array.isArray(data) && data.map(x => {
          const entity = this.createEntity(this.entitySchemaName);
          this.setEntityColumnsValues(entity, x);
          return entity;
        })
      )
    )
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
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

  getColumnCaption(columnName: string): Observable<string> {
    const column = this.entitySchema && this.entitySchema.getPropertyDescriptor(columnName);
    return column ? this.translate.get(column.caption) : null;
  }

}
