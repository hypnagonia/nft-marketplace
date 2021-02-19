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
import { mediaFile, moreThanZero } from "../../utils";


export class Create721 extends React.Component<any> {
  formRef: MobxForm;

  render() {
    return (
      <Box direction="row" justify="center">
        <Form
          ref={ref => (this.formRef = ref)}
          data={{
            royalties: 10
          }}
          {...({} as any)}
        >

          <Box direction="column" fill={true}>
            <Box direction="row" justify="center">
              <Title>Create Collection</Title>
            </Box>

            <FileInput
              label={<>Upload File <span style={{fontSize: '14px'}}>PNG, GIF, WEBP, MP4 or MP3. Max 30mb</span></>}
              name="logo"
              rules={[
                isRequired,
                mediaFile
              ]}
            />

            <Input
              label="Name"
              name="name"
              style={{ width: "100%" }}
              placeholder="Token name"
              rules={[isRequired]}
            />

            <Input
              label="Symbol"
              name="symbol"
              style={{ width: "100%" }}
              placeholder="Token symbol"
              rules={[isRequired]}
            />

            <Input
              label="Description (optional)"
              name="description"
              style={{ width: "100%" }}
              placeholder="A few words about your token collection"
            />

            <Input
              label="Short URL"
              name="url"
              style={{ width: "100%" }}
              placeholder="URL"
              rules={[isRequired]}
            />

            <Box direction="row" justify="center">
              <Button
                bgColor="#00ADE8"
                style={{ width: 220, margin:10 }}
                onClick={() => {
                }}
              >
                Create Collection
              </Button>
            </Box>
          </Box>

        </Form>
      </Box>
    );
  }
};
