import { Ref, ref } from 'vue'
import { useOnIframePostMessage } from './useOnIframePostMessage.js'
import { z } from 'zod'

const FormDataSchema = z.object({
  email: z.string(),
  orgName: z.string(),
})
type FormData = z.infer<typeof FormDataSchema>

const IframeMessageSchema = z.union([
  z.object({
    type: z.literal('dataUpdated'),
    data: FormDataSchema,
  }),
  z.object({
    type: z.literal('submitted'),
  }),
])

export const useFormSubmissionData = ({
  src,
  onSubmit,
}: {
  src: Ref<string>
  onSubmit: (formData: FormData) => void
}) => {
  const formData = ref<FormData | null>(null)
  const isSubmitted = ref(false)

  useOnIframePostMessage({
    src,
    onMessage: (message) => {
      if (message.type === 'dataUpdated') {
        formData.value = message.data
      }
      if (message.type === 'submitted') {
        if (formData.value && !isSubmitted.value) {
          isSubmitted.value = true
          onSubmit(formData.value)
        }
      }
    },
    schema: IframeMessageSchema,
  })
}
