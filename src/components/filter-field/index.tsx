import { Box, MenuItem, TextField, TextFieldProps } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import React, { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import { useDebounce } from '$hooks';
import { AllowedFilterTypes, SelectItem } from '$types';

const INPUT_WIDTH = 202;

type TextFieldDebouncedProps = Omit<TextFieldProps, 'onChange'> & {
  onChangeDebounced?: (val: any) => void;
  debounceDelay?: number;
};
const TextFieldDebounced = memo(
  forwardRef<HTMLDivElement, TextFieldDebouncedProps>(
    ({ onChangeDebounced, value: initialValue, debounceDelay = 700, ...props }, ref) => {
      const [value, setValue] = useState(initialValue);
      const debouncedValue = useDebounce(value, debounceDelay);
      const onChange = useCallback<
        React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
      >(({ target: { value: v } }) => setValue(v), []);
      useEffect(() => {
        onChangeDebounced?.(debouncedValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [debouncedValue]);
      return <TextField ref={ref} value={value} onChange={onChange} {...props} />;
    }
  )
);

export type FilterFieldProps<T = unknown> = {
  type: AllowedFilterTypes;
  onChange: (value: T) => void;
  value: T;
  label: string;
} & (
  | { type: 'select'; items: SelectItem[] }
  | { type: 'number' | 'string' | 'date' | 'boolean' | 'link' }
);

export const FilterField: React.FC<FilterFieldProps> = memo(function FilterField(props) {
  const { onChange, value, label } = props;

  switch (props.type) {
    case 'string':
      return (
        <TextFieldDebounced
          value={value}
          onChangeDebounced={onChange}
          label={label}
          sx={{ width: INPUT_WIDTH, maxWidth: '100%' }}
          inputProps={{ style: { height: 'auto' } }}
        />
      );

    case 'number':
      return (
        <TextFieldDebounced
          value={value}
          onChangeDebounced={onChange}
          label={label}
          type='number'
          sx={{ width: INPUT_WIDTH, maxWidth: '100%' }}
          inputProps={{ style: { height: 'auto' } }}
        />
      );

    case 'select':
      return (
        <TextFieldDebounced
          value={value}
          onChangeDebounced={onChange}
          label={label}
          sx={{ width: INPUT_WIDTH, maxWidth: '100%' }}
          inputProps={{ style: { height: 'auto' } }}
          select
          debounceDelay={0}
        >
          <MenuItem value={undefined}>
            <em>
              <b>None</b>
            </em>
          </MenuItem>
          {props.items.map((el, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={i} value={el.value as string}>
              {el.label}
            </MenuItem>
          ))}
        </TextFieldDebounced>
      );

    case 'date':
      return (
        <DateRangePicker
          value={value}
          onChange={onChange}
          renderInput={(startProps: any, endProps: any) => (
            <>
              <TextField
                {...startProps}
                label={`${label} - Start`}
                sx={{ width: INPUT_WIDTH, maxWidth: '100%' }}
                inputProps={{ style: { height: 'auto' }, ...startProps.inputProps }}
              />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField
                {...endProps}
                label={`${label} - End`}
                sx={{ width: INPUT_WIDTH, maxWidth: '100%' }}
                inputProps={{ style: { height: 'auto' }, ...startProps.inputProps }}
              />
            </>
          )}
        />
      );

    case 'boolean':
      return (
        <TextFieldDebounced
          value={value}
          onChangeDebounced={v => onChange(v === 'true')}
          label={label}
          sx={{ width: INPUT_WIDTH, maxWidth: '100%' }}
          inputProps={{ style: { height: 'auto' } }}
          select
          debounceDelay={0}
        >
          <MenuItem value={undefined}>
            <em>
              <b>None</b>
            </em>
          </MenuItem>
          <MenuItem value='true'>True</MenuItem>
          <MenuItem value='false'>False</MenuItem>
        </TextFieldDebounced>
      );

    default:
      return (
        <TextFieldDebounced
          value={value}
          onChangeDebounced={onChange}
          label={label}
          sx={{ width: INPUT_WIDTH, maxWidth: '100%' }}
          inputProps={{ style: { height: 'auto' } }}
        />
      );
  }
});
