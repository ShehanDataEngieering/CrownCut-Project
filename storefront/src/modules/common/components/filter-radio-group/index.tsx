type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="mb-3">
      <h6 className="text-muted mb-2">{title}</h6>
      <div data-testid={dataTestId}>
        {items?.map((i) => (
          <div key={i.value} className="form-check mb-2">
            <input
              type="radio"
              className="form-check-input tp-theme-check"
              id={i.value}
              name={title}
              value={i.value}
              checked={i.value === value}
              onChange={() => handleChange(i.value)}
            />
            <label
              htmlFor={i.value}
              className="form-check-label"
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterRadioGroup
