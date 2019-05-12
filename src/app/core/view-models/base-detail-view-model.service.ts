import { FormArray, AbstractControl } from '@angular/forms';
import { LookupConfig } from '../decorators/property.decorator';
import { BasePageViewModel } from './base-page-view-model.service';
import { Observable } from 'rxjs';

export abstract class BaseDetailViewModelService extends BasePageViewModel {
  formArray: FormArray;

  abstract visibleFields: Array<string>;

  get subTitle$(): Observable<string> {
    return this.translate && this.translate.get(this.entitySchema.caption);
  }

  get controlList(): Array<AbstractControl> {
    return this.formArray && this.formArray.controls;
  }

  add() {
    const schema = this.entitySchema;
    const properties = schema.getProperties().map(x => x.name);
    this.controlList.push(
      this.createForm(properties, schema)
    );
  }

}
