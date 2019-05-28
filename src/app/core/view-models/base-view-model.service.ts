// tslint:disable:ban-types
import { MatSnackBar } from '@angular/material';
import { Injector } from '@angular/core';
import { BaseModel } from '../models/base.model';
import { DataValueType, LookupConfig, DropDownConfig, ModelPropertyDescriptor } from '../decorators/property.decorator';
import { DataService } from '../data.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Model, ModelDescriptor } from '../decorators/model.decorator';
import { ViewModelActionDescriptor, ViewModelAction } from '../decorators/view-model-action.decorator';
import { EntitySchemaManagerService } from '../services/entity-schema-namager.service';

export abstract class BaseViewModel {

  protected dataService: DataService<BaseModel>;
  protected mobileQuery: MediaQueryList;
  protected translate: TranslateService;
  protected formBuilder: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;
  protected location: Location;
  protected dialog: MatDialog;
  protected snackBar: MatSnackBar;

  protected entity: BaseModel;
  protected entitySchemaName: string;
  protected entitySchema: ModelDescriptor;
  protected esm: EntitySchemaManagerService;

  get actions(): Array<ViewModelActionDescriptor> {
    const result = this.esm.getActions(this);
    return result;
  }

  constructor(
    protected injector: Injector
  ) {
    this.setUpDeps();
  }

  init() {
    this.entitySchema = Model.getModelDescriptor(this.entitySchemaName);
  }

  isDate(value): boolean {
    return value && value.constructor === Date;
  }

  getEntitySchemaByName(entitySchemaName: string): ModelDescriptor {
    const result = this.esm.getEntitySchemaByName(entitySchemaName)
    return result;
  }

  getEntitySchemaPropertyByName(propertyName: string): ModelPropertyDescriptor {
    return this.entitySchema.getPropertyDescriptor(propertyName);
  }

  invokeAction(action: ViewModelActionDescriptor) {
    if (this[action.name]) {
      this[action.name]();
    }
  }

  getEntitySchema(): ModelDescriptor {
    return this.entitySchema;
  }

  protected setUpDeps() {
    this.esm = this.injector.get(EntitySchemaManagerService);
    this.dataService = this.injector.get(DataService);
    this.translate = this.injector.get(TranslateService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.location = this.injector.get(Location);
    this.dialog = this.injector.get(MatDialog);
    this.snackBar = this.injector.get(MatSnackBar);
  }

  protected createEntity(entitySchemaName: string): BaseModel {
    const entity = this.esm.createEntity(entitySchemaName);
    return entity;
  }

  protected setEntityColumnsValues(entity: BaseModel, values) {
    this.esm.setEntityColumnsValues(entity, values);
  }

  protected setEntityColumnValue(entity: BaseModel, key: string, value) {
    this.esm.setEntityColumnValue(entity, key, value);
  }

  protected getSchemaName(schema: Function): string {
    return this.esm.getSchemaName(schema);
  }

}
