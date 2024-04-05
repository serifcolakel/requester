import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const firstStep = z.object({
  name: z.string().min(1, 'Please enter a name'),
});

const secondStep = z.object({
  name: z.string().min(1, 'Please enter a name'),
});

const stepsSchema = z.object({
  steps: z.array(z.union([firstStep, secondStep])),
});

type Props = {
  onSubmit: (data: z.infer<typeof stepsSchema>, currentStep: number) => void;
  stepsSchema: z.infer<typeof stepsSchema>;
};

export default function Test({ onSubmit, stepsSchema }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const {} = useForm({
    mode: 'onChange',
    defaultValues: {
      steps: [
        {
          name: '',
        },
      ],
    },
    resolver: zodResolver(stepsSchema.steps[currentStep]),
  });

  return (
    <FormBuilder onSubmit={onSubmit}>
      <FormBuilder.Step as="div" value={0}>
        <FormBuilder.Field
          description="Please enter a name"
          label="Name"
          name="name"
        />
      </FormBuilder.Step>
      <FormBuilder.Step as="div" value={1}>
        <FormBuilder.Field
          description="Please enter a name"
          label="Name"
          name="name"
        />
      </FormBuilder.Step>
      <FormBuilder.Step as="div" value={1}>
        <FormBuilder.Field
          description="Please enter a name"
          label="Name"
          name="name"
        />
      </FormBuilder.Step>
    </FormBuilder>
  );
}
