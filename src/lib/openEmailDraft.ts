const contactRecipient = 'aviralpant369@gmail.com'

export function createEmailDraftUrl(
  subject: string,
  fields: Record<string, string>,
) {
  const body = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n\n')

  return [
    `mailto:${contactRecipient}`,
    `?subject=${encodeURIComponent(subject)}`,
    `&body=${encodeURIComponent(body)}`,
  ].join('')
}
