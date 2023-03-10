import { FC, ChangeEvent } from 'react';
import classNames from 'classnames';

interface Props {
  id?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  label?: string;
  disabled?: boolean;
  rows?: number;
  onChange?(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
}

const Input: FC<Props> = ({
  id = '',
  type = 'text',
  placeholder = '',
  className = '',
  inputClassName = '',
  label = '',
  disabled = false,
  rows,
  onChange,
}) => {
  const baseProps = {
    id,
    type,
    className: classNames(
      'rounded appearance-none bg-white border border-gray-100 md:text-base text-xs leading-5 pt-3 pr-9 pb-3 pl-3.5 w-full focus:border-black focus:outline-none p-3',
      inputClassName,
      { 'bg-lightgray placeholder:text-grey': disabled }
    ),
    placeholder,
    onChange,
    disabled,
  };
  return (
    <div className={classNames({ 'sm:pt-2.5 pb-5 relative': Boolean(label) }, className)}>
      {label && (
        <label htmlFor={id} className="block text-left leading-4 pb-4">
          {label}
        </label>
      )}
      {rows ? <textarea {...baseProps} rows={rows} /> : <input {...baseProps} />}
    </div>
  );
};

export default Input;
