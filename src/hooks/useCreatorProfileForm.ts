import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

interface Link {
  name: string
  url: string
}

interface FormData {
  greetings: string
  links: Link[]
}

type OnSubmit = (data: FormData) => void

function useCreatorProfileForm(defaultValues: FormData) {
  const {
    control, register, handleSubmit, reset, watch
  } = useForm<FormData>({
    defaultValues
  })
  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues])

  const watchLinks = watch('links')
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  })

  function normalizeProtocol(link: Link) {
    if (/^https?:\/\//i.test(link.url)) {
      return link
    } else {
      return {
        ...link,
        url: `http://${link.url}`,
      }
    }
  }

  const withRefinedData = (callback: OnSubmit) => {
    return (data: FormData) => {
      const { links = [] } = data
      const refinedData = {
        ...data,
        links: links.map(normalizeProtocol)
      }
      callback(refinedData)
    }
  }

  return {
    register,
    watchLinks,
    linkFields: fields,
    addLink: append,
    removeLink: remove,
    handleSubmit: (callback: OnSubmit) => handleSubmit(withRefinedData(callback)),
  }
}

export default useCreatorProfileForm