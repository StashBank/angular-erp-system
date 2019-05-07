export class EnumDescriptor {
  name: string;
  translatePath: string;
  type?: 'number' | 'string' = 'number';
}

export function Enum(descriptor: EnumDescriptor) {
  descriptor = Object.assign(new EnumDescriptor(), descriptor);
  return target => {
    let enums = Reflect.getMetadata('enums', Object.prototype) as Array<any>;
    if (!enums) {
      enums = [];
      Reflect.defineMetadata('enums', enums, Object.prototype);
    }
    if (!enums.includes(x => x.name === descriptor.name)) {
      enums.push({
        name: descriptor.name,
        ctor: target,
        descriptor
      });
    }
    target.getMetaData = () => descriptor;
  };
}
