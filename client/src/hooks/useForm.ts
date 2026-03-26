import { useState, ChangeEvent, FormEvent } from 'react'

type FormValues = Record<string, string>
type FormErrors = Record<string, string>

interface UseFormOptions {
  initialValues: FormValues
  validate?: (values: FormValues) => FormErrors
  onSubmit: (values: FormValues) => Promise<void> | void
}

function useForm({ initialValues, validate, onSubmit }: UseFormOptions) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (validate) {
      const validationErrors = validate(values)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }
    setIsSubmitting(true)
    try {
      await onSubmit(values)
      setIsSuccess(true)
      setValues(initialValues)
    } catch (err: unknown) {
      setErrors({ submit: err instanceof Error ? err.message : 'Submission failed' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setIsSuccess(false)
  }

  return { values, errors, isSubmitting, isSuccess, handleChange, handleSubmit, reset }
}

export default useForm
