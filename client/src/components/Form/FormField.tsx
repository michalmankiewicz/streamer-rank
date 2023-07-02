import { Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  showError: boolean;
  errorMessage: string;
  children?: ReactNode;
};

function FormField(props: Props) {
  return (
    <div>
      {props.children}
      {props.showError && (
        <Typography ml={1} fontSize={15} color="red">
          {props.errorMessage}
        </Typography>
      )}
    </div>
  );
}

export default FormField;
