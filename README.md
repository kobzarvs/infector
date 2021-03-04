# infector
inversify + effector integration

## Структура проекта

Проект состоит из трех модулей:

1. @infector/model
   
    Предоставляет интерфейс
    ```js
    export interface IModel {
        inc: Event<void | any>
        dec: Event<void | any>
        getStore(): Store<number>
        destroy(): void
    }
    ```
   
2. @infector/model-addon
   
    ```js
    export interface IModelAddon {
        add: Event<number>
        sub: Event<number>
        destroy: () => void
    }
    ```


3. @infector/main-react-app
    React приложение, использующее два вышеуказанных модуля.

    ```
    App
      |
      +-- [<Counter />, ...] // массив счетчиков
      |      |
      |      +-- контейнеры с интерфейсом ICounter
      |            |
      |            +--  контейнер IModel
      |            |
      |            +--  контейнер IModelAddon
      |
      +-- <SingletonCheckbox ... /> // переключение режима Singleton/Transient scopes
    ```   

**ICounter interface**

```js
export interface ICounter extends IModel, IModelAddon {
  destroy: () => void
}
```

Модули `model` и `model-addon` полностью независимые, являются отдельными npm
пакетами и предоставляют публичное api через свои интерфейсы.

Модуль `model` позволяет создать контейнеры с effector store типа number, 
а так же два метода для увеличения/уменьшения значения стора

Модуль `model-addon` создает контейнер, к которому можно во время инициализации
забиндить любой внешний стор. Модуль добавляет к внешнему стору функциональность
для добавления и вычитания числового значения.

Например, так выглядит создание двух контейнеров Model, ModelAddon

```js
  const model = ctx.container.get<IModel>(IModel)
  const addon = ctx.container.getTagged<IModelAddon>(IModelAddon, IExternalStore, model.getStore())

```

IExternalStore является extension point (точкой расширения) для класса ModelAddon
и при привязке к нему значения мапит его в приватное свойство класса ModelAddon.

В реакт приложении для компонента Counter есть контейнер с интерфейсом ICounter,
который объединяет в себе API от Model и ModelAddon для работы с одним и тем же стором.

## Режимы inSingletonScope и обратный ему inTransientScope

В режиме по умолчанию inTransientScope каждый запрос контейнера
ICounter будет создавать новый инстанс со своими Model и ModelAddon,
по сути являясь фабрикой. 

В Режиме inSingletonScope при первом запросе будет создан singleton контейнер,
а каждый последующий запрос получит его инстанс из cache.

## Сборка и запуск вэб приложения

```shell
infector> yarn && yarn start
```

## Поэкспериментировать с модулями

```shell
infector> yarn build:model

infector> yarn build:addon

infector> yarn test:addon

```

Последняя команда запустит `packages/model-addon/src/example.ts`

## Пример работы вэб приложения

![infector](https://user-images.githubusercontent.com/1615093/109965954-b54b1200-7d00-11eb-9b95-30ff100898ad.gif)
