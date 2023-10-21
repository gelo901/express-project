const MAX_COUNT_TITLE = 15;

export const checkValidateFields = (title?: string, author?: string, availableResolutions?: string[]) => {
  if (title && author && availableResolutions?.length) {
    return null
  }

  const errorFields = []

  if (!title || title?.length > MAX_COUNT_TITLE) {
    errorFields.push('title')
  }
  if (!author) {
    errorFields.push('author')
  }
  if (!availableResolutions?.length) {
    errorFields.push('availableResolutions')
  }
  return {
    errorsMessages: [
      {
        message: 'error validation',
        field: errorFields.join(', ')
      }
    ]
  }
}
