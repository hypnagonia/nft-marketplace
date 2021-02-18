import { Box } from 'grommet';
import { Button } from '../../components/Base/components/Button';
import { Error } from '../../ui/Error';
import * as React from 'react';

export const WalletButton = (props: any) => {
  const { error, children, ...buttonProps } = props;

  return (
    <Box
      direction="column"
      justify="center"
      align="baseline"
      margin={{ bottom: 'small' }}
        style={{width:180}}
    >
      <Button
        margin={{ right: 10 }}
        pad={{ vertical: 'xsmall' }}
        style={{
          borderRadius: 5,
          border: '1px solid #dedede',
          width: 180,
          textAlign: 'center',
        }}
        transparent={true}
        {...buttonProps}
      >
        {children}
      </Button>
      <div style={{textAlign:'center', width:'100%'}}>
      {error ? <Error error={error} /> : null}
      </div>
    </Box>
  );
};
