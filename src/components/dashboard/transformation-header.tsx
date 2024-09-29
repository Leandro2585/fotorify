type HeaderProps = {
  title: string
  subtitle?: string
}

const TransformationsHeader = ({ title, subtitle }: HeaderProps) => {
  return (
    <div>
    <h2 className="h2-bold">{title}</h2>
    {subtitle && <p className="p-16-regular mt-4">{subtitle}</p>} 
    </div>
  )
}

export { TransformationsHeader }