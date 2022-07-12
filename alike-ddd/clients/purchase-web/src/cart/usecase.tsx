import { useQuery } from 'react-query'
import { InputEventKey, UsecaseLine } from '@alike-ddd/common'

export const newUsecaseLineHook =
  <
    UC extends UsecaseLine<InputEvent, OutputEvent>,
    BaseInputEvent extends InputEvent,
    InputEvent = Parameters<UC>[0],
    OutputEvent = Awaited<ReturnType<UC>>
  >(
    usecaseLine: UC,
    baseInputEvent: BaseInputEvent
  ) =>
  //TODO BaseInputEvent で指定された 型を optional にした型にする
  (event: Omit<InputEvent, InputEventKey>, options?: { fetchEnabled?: boolean }): OutputEvent | undefined => {
    const mergedEvent = { ...baseInputEvent, ...event }
    const cacheKey = JSON.stringify(event) ?? ''
    const enabled = cacheKey !== '' || options?.fetchEnabled

    const res = useQuery(cacheKey, (ctx) => usecaseLine(mergedEvent), {
      enabled,
    })

    if (res.isFetched) {
      return res.data
    }
    return undefined
  }
