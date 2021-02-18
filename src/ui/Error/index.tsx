import * as React from 'react';
import { Box } from 'grommet';
import { Text } from 'grommet';
import { CSSProperties } from 'styled-components';
import { printError } from 'utils';

export const Error: React.FC<{ error: any; style?: CSSProperties }> = ({
  error,
  style,
}) => (
    <Text size="small" color="red" style={{ maxWidth: '100%' }}>
      {printError(error).slice(0, 1000)}
    </Text>
);
