import { Dispatch, SetStateAction } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Toggle({
  enabled,
  setEnabled,
  title,
  helpText,
  className,
}: {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  title: string;
  helpText?: string;
  className?: string;
}) {
  return (
    <Switch.Group
      as="div"
      className={classNames('flex items-center', className || '')}
    >
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-teal-600' : 'bg-gray-200 dark:bg-gray-700',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 dark:ring-offset-black'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out dark:bg-zinc-200'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">
          {title}
        </span>
        {helpText && (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {helpText}
          </span>
        )}
      </Switch.Label>
    </Switch.Group>
  );
}
