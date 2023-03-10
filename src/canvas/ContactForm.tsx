import { FC, useState, useCallback } from 'react';
import Image from 'next/image';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { withContent } from '../hocs/withContent';

type ContactFormProps = ComponentProps<{
  submitButtonText: string;
  successfulSubmitText: string;
  errorSubmitText: string;
  successfulSubmitImage: string;
  errorSubmitImage: string;
}>;

const ContactForm: FC<ContactFormProps> = ({
  submitButtonText,
  successfulSubmitText,
  errorSubmitText,
  successfulSubmitImage,
  errorSubmitImage,
}) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = useCallback(() => {
    // random submission result for demo purposes
    const isErrorAppear = Math.random() >= 0.5;
    setIsFormSubmitted(true);
    setIsError(isErrorAppear);
  }, []);

  const submitImage = isError ? errorSubmitImage : successfulSubmitImage;
  const submitText = isError ? errorSubmitText : successfulSubmitText;

  return (
    <div className="flex flex-col sm:flex-row lg:pl-20">
      {isFormSubmitted ? (
        <div className="flex gap-x-8 flex-col sm:flex-row items-start sm:items-center">
          {Boolean(submitImage) && <Image src={submitImage} width={600} height={600} alt="submit-image" />}
          <p className="font-extrabold text-3xl lg:text-4xl pt-4 sm:pt-0 sm:max-w-sm">{submitText}</p>
        </div>
      ) : (
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 row-gap-6 md:row-gap-3 col-gap-8 w-full"
        >
          <Input id="name" label="Name" className="mb-2" />
          <Input id="email" type="email" label="Email" className="mb-2" />
          <Input id="company" label="Company" className="mb-2" />
          <Input id="message" label="Tell us a little about why you are contacting us" inputClassName="h-48" rows={1} />
          <Button.Action styleType="primary" type="submit" className="text-sm max-w-full sm:max-w-max mt-5">
            <span>{submitButtonText}</span>
          </Button.Action>
        </form>
      )}
    </div>
  );
};

registerUniformComponent({
  type: 'contactForm',
  component: withContent(ContactForm),
});

export default ContactForm;
