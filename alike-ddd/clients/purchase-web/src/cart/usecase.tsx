import { useQuery } from 'react-query'
import { InputEventKey, InputEvent, UsecaseLine } from '@alike-ddd/common'

// type BaseInputEventForCheck<T> = (CommandEvent | QueryEvent) & Partial<T>
//type BaseInputEventForCheck<T> = { [K in InputEventKey]?: string } & Partial<T>

// export type PickInputEvent<Usecase extends UsecaseLine<InputEvent, any>> = Parameters<Usecase>[0]
// export type PickOutputEvent<Usecase extends UsecaseLine<InputEvent, any>> = Awaited<ReturnType<Usecase>>

export type HookForUsecaseLineOptions = { fetchEnabled: boolean }

export type PickInputEvent<
  Usecase extends UsecaseLine<InputEvent, OutputEvent>,
  InputEvent = Parameters<Usecase>[0],
  OutputEvent = Awaited<ReturnType<Usecase>>
> = InputEvent

export type PickOutputEvent<
  Usecase extends UsecaseLine<InputEvent, OutputEvent>,
  InputEvent = Parameters<Usecase>[0],
  OutputEvent = Awaited<ReturnType<Usecase>>
> = OutputEvent

export const newHookForUsecaseLine =
  <
    Usecase extends UsecaseLine<InputEvent, OutputEvent>,
    BaseInputEvent extends InputEvent, //BaseInputEventForCheck<InputEvent>,
    InputEvent = Parameters<Usecase>[0],
    OutputEvent = Awaited<ReturnType<Usecase>>
  >(
    usecaseLine: Usecase,
    baseInputEvent: BaseInputEvent
  ) =>
  //TODO BaseInputEvent で指定された 型を optional にした型にしたいわからないので あとで調査する
  (
    event: Omit<InputEvent, InputEventKey>,
    options: HookForUsecaseLineOptions = { fetchEnabled: false }
  ): OutputEvent | undefined => {
    const mergedEvent = { ...baseInputEvent, ...event }
    const cacheKey = JSON.stringify(mergedEvent) ?? ''
    const enabled = cacheKey !== '' || options?.fetchEnabled

    const res = useQuery(cacheKey, (ctx) => usecaseLine(mergedEvent), {
      enabled,
    })

    if (res.isFetched) {
      return res.data
    }
    return undefined
  }
