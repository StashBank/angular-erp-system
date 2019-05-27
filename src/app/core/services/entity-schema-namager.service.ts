import { Injectable } from '@angular/core';
import { ViewModelActionDescriptor, ViewModelAction } from '../decorators/view-model-action.decorator';
import { BaseViewModel } from '../view-models/base-view-model.service';
import { Model, ModelDescriptor } from '../decorators/model.decorator';
import { BaseModel } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class EntitySchemaManagerService {

  constructor() { }

  public getActions(target: BaseViewModel): Array<ViewModelActionDescriptor> {
    const actions = Reflect.getMetadata('viewModelActions', target) as Array<string>;
    const result: Array<ViewModelActionDescriptor> = actions.map(name => ViewModelAction.getDescriptor(name, target));
    return result;
  }

  public getEntitySchemaByName(entitySchemaName: string): ModelDescriptor {
    return Model.getModelDescriptor(entitySchemaName);
  }

  public createEntity(entitySchemaName: string): BaseModel {
    const models = Reflect.getMetadata('models', Object.prototype) as Array<any>;
    const model = models.find(x => x.name === entitySchemaName);
    const entity = Object.create(model.ctor.prototype);
    return entity as BaseModel;
  }

}
