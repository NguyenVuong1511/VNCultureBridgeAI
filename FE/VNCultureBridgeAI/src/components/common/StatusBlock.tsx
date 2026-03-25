type StatusBlockProps = {
  title: string
  description: string
  tone?: 'default' | 'error'
}

export function StatusBlock({ title, description, tone = 'default' }: StatusBlockProps) {
  return (
    <div className={`status-block ${tone === 'error' ? 'status-block-error' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
