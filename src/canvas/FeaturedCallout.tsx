import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '../components/Container';
import Button from '../components/Button';
import { withContent } from '../hocs/withContent';

export enum DirectionVariant {
  Right = 'right',
  Left = 'left',
}

const DirectionClasses = {
  [DirectionVariant.Right]: 'lg:flex-row-reverse',
  [DirectionVariant.Left]: 'lg:flex-row',
};

export type FeaturedCalloutProps = ComponentProps<{
  title: string;
  description: string;
  buttonCopy?: string;
  buttonLink?: string;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  image: string;
}>;

const FeaturedCalloutVariation: FC<FeaturedCalloutProps & { direction?: DirectionVariant }> = ({
  title,
  description,
  direction,
  buttonCopy,
  buttonLink,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
  image,
}) => {
  return (
    <Container paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <div
        className={classNames(
          'flex flex-col gap-x-16 gap-y-16 max-w-full lg:items-center',
          direction ? DirectionClasses[direction] : ''
        )}
      >
        <div className="basis-1/2">
          {Boolean(image) && <Image width={504} height={504} src={image} alt="featured callout" />}
        </div>
        <div className="flex flex-col justify-center pt-8 md:pt-12 lg:pt-0 basis-1/2">
          <p className="font-extrabold text-3xl">{title}</p>
          {Boolean(description) && <div className="product-description pt-6">{description}</div>}
          {buttonCopy && buttonLink && (
            <Button.Link
              href={buttonLink}
              styleType="primary"
              ariaLabel={buttonCopy}
              className="mt-6 text-sm md:mt-10 w-max"
            >
              <span>{buttonCopy}</span>
            </Button.Link>
          )}
        </div>
      </div>
    </Container>
  );
};

const FeaturedCallout: FC<FeaturedCalloutProps> = props => (
  <FeaturedCalloutVariation direction={props.component.variant as DirectionVariant} {...props} />
);

['left', 'right', undefined].forEach(variantId =>
  registerUniformComponent({
    type: 'featuredCallout',
    component: withContent(FeaturedCallout),
    variantId,
  })
);

export default FeaturedCallout;
