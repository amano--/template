const common = { id: 'common' }
const purchase = { id: 'purchase' }

const boundedContexts = { common, purchase }

export type AllBoundedContext = typeof boundedContexts
export type BoundedContextKey = keyof AllBoundedContext

export type BoundedContext<KEY extends BoundedContextKey = 'common'> = AllBoundedContext[KEY]
