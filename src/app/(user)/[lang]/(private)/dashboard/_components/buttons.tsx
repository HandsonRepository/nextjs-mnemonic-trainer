'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/buttons';
import { startExamination } from '../../_actions';

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const isConfirmed = window.confirm('Would you like to start the test?');
  if (isConfirmed) {
    await startExamination();
  }
};

export function StartExaminationButton() {
  const buttonClassName = buttonVariants();

  return (
    <form onSubmit={onSubmit}>
      <button className={`${buttonClassName} w-full`} type="submit">
        Start Examination
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    </form>
  );
}