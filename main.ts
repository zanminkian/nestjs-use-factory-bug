import 'reflect-metadata'
import { NestFactory } from '@nestjs/core';
import { Inject, Module } from '@nestjs/common';

@Module({})
export class BaseModule {
  static forFeature(value: string, name: string = 'default') {
    const providers = [{
      provide: name,
      // If I replace `useFactory: () => value` with `useValue: value`, this bug will disappear
      // useValue: value
      useFactory: () => value
    }]
    return {
      module: BaseModule,
      providers,
      exports: providers
    }
  }
}

export class AService {
  constructor(@Inject('default') private readonly value: string){
    console.log(value)
  }
  print() {
    console.log(this.value)
  }
}

@Module({
  imports: [BaseModule.forFeature('AModule value')],
  providers: [AService],
  exports: [AService]
})
export class AModule {}

export class BService {
  constructor(@Inject('default') private readonly value: string){
    console.log(value)
  }
  print() {
    console.log(this.value)
  }
}

@Module({
  imports: [BaseModule.forFeature('BModule value')],
  providers: [BService],
  exports: [BService]
})
export class BModule {}


@Module({
  imports: [AModule, BModule]
})
export class AppModule{
}

(async ()=>{
  const app = await NestFactory.create(AppModule)
  app.listen(9090)
})()
