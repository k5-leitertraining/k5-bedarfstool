import { Ref, onBeforeUnmount, onMounted } from 'vue'
import { z } from 'zod'

export const useOnIframePostMessage = <TSchema extends z.ZodSchema>({
  src,
  onMessage,
  schema,
}: {
  src: Ref<string>
  onMessage: (data: z.infer<TSchema>) => void
  schema: TSchema
}) => {
  const handleMessage = (event: MessageEvent) => {
    const origin = new URL(src.value).origin
    if (event.origin === origin) {
      const parseResult = schema.safeParse(event.data)
      if (!parseResult.success) return
      onMessage(parseResult.data)
    }
  }

  onMounted(() => {
    window.addEventListener('message', handleMessage)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('message', handleMessage)
  })
}
