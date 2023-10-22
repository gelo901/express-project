const MAX_COUNT_TITLE = 20

const isInvalidString = (inputString: string) => {
  const regex = /^[A-Z].*\d$/
  return regex.test(inputString)
}
function isValidDateFormat(inputString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
  return regex.test(inputString)
}

export const checkValidateFields = (
  title?: string,
  author?: string,
  availableResolutions?: string[],
  canBeDownloaded?: boolean | string,
  minAgeRestriction?: number,
  publicationDate?: string
) => {
  const errorsMessages = []

  if (!title || title?.trim().length > MAX_COUNT_TITLE) {
    errorsMessages.push({
      message: 'error validation',
      field: 'title'
    })
  }

  if (!author || author?.trim().length > MAX_COUNT_TITLE) {
    errorsMessages.push({
      message: 'error validation',
      field: 'author'
    })
  }

  if (availableResolutions?.length) {
    const checkAvailableResolutionsItem = availableResolutions.filter((resolution) => isInvalidString(resolution))
    if (availableResolutions.length !== checkAvailableResolutionsItem?.length) {
      errorsMessages.push({
        message: 'error validation',
        field: 'availableResolutions'
      })
    }
  }

  if (!availableResolutions?.length) {
    errorsMessages.push({
      message: 'error validation',
      field: 'availableResolutions'
    })
  }

  if (canBeDownloaded && typeof canBeDownloaded !== 'boolean') {
    errorsMessages.push({
      message: 'error validation',
      field: 'canBeDownloaded'
    })
  }

  if (minAgeRestriction && minAgeRestriction > 21) {
    errorsMessages.push({
      message: 'error validation',
      field: 'minAgeRestriction'
    })
  }

  if (publicationDate && !isValidDateFormat(publicationDate)) {
    errorsMessages.push({
      message: 'error validation',
      field: 'publicationDate'
    })
  }

  return {
    errorsMessages
  }
}
