import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text, Button } from "components/Base";
import * as styles from "./create-styles.styl";
import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import { Icon } from "components/Base/components/Icons";
import {
  FileInput,
  Form,
  Input,
  isRequired,
  MobxForm,
  NumberInput
} from "components/Form";
import { IStores } from "../../stores";
import { moreThanZero } from "../../utils";


export class Create721 extends React.Component<any> {
  formRef: MobxForm;

  render() {
    return (
      <Box direction="row" justify="center" margin={{ bottom: "medium" }}>
        <Form
          ref={ref => (this.formRef = ref)}
          data={{
            royalties: 10
          }}
          {...({} as any)}
        >

          <Box direction="column" fill={true}>

            <Title>Create Collection</Title>

            <FileInput
              label="Upload File"
              name="logo"
            />

            <Input
              label="Display Name"
              name="name"
              style={{ width: '100%' }}
              placeholder="Token name"
              rules={[isRequired]}
            />

            <Input
              label="Symbol"
              name="symbol"
              style={{ width: '100%' }}
              placeholder="Token symbol"
              rules={[isRequired]}
            />

            <Input
              label="Description (optional)"
              name="description"
              style={{ width: '100%' }}
              placeholder="A few words about your token collection"
            />

            <Input
              label="Short URL"
              name="url"
              style={{ width: '100%' }}
              placeholder="URL"
              rules={[isRequired]}
            />


            <Button
              bgColor="#00ADE8"
              style={{width: 220 }}
              onClick={() => {
              }}
            >
              Create Collection
            </Button>
          </Box>

        </Form>
      </Box>
    );
  }
};