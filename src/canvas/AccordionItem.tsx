import { FC, useCallback, useState } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Image from 'next/image';
import { withContent } from '../hocs/withContent';

type Props = ComponentProps<{
  title: string;
  description: string;
}>;

const AccordionItem: FC<Props> = ({ title, description }) => {
  const [isOpened, setOpened] = useState(false);

  const toggleAccordion = useCallback(() => setOpened(isOpened => !isOpened), []);

  return (
    <div className="mb-6 last:mb-0">
      <button
        onClick={toggleAccordion}
        className="flex flex-row justify-between items-center p-4 md:p-8 bg-gray-50 text-2xl font-extrabold w-full border"
      >
        <p className="text-start pr-2">{title}</p>
        <div className="flex items-center">
          {isOpened ? (
            <Image
              width={25}
              height={25}
              src="https://res.cloudinary.com/uniformdev/image/upload/v1675622825/vNext%20Demos/icons/icon-minus_rl6auo.svg"
              alt="icon minus"
              unoptimized
            />
          ) : (
            <Image
              width={25}
              height={25}
              src="https://res.cloudinary.com/uniformdev/image/upload/v1675622526/vNext%20Demos/icons/icon-plus_pcl73l.svg"
              alt="icon plus"
              unoptimized
            />
          )}
        </div>
      </button>
      {isOpened && <p className="p-10">{description}</p>}
    </div>
  );
};

registerUniformComponent({
  type: 'accordionItem',
  component: withContent(AccordionItem),
});

export default AccordionItem;
