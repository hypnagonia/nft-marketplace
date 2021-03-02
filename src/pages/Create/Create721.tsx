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
import { imageFile, moreThanZero } from "../../utils";
import { deployNFT } from "../../blockchain-bridge/hmy/index";
import { inject, observer } from "mobx-react";
import { observable } from "mobx";

const initialFormData = {
  royalties: 10,
  name: "",
  description: "",
  symbol: "",
};

@inject("user", "exchange", "actionModals", "userMetamask", "routing")
@observer
export class Create721 extends React.Component<any> {
  formRef: MobxForm;
  @observable formData = initialFormData

  submit = async () => {
    const isMetamask = this.props.user.isMetamask;
    const deployNewToken = deployNFT.deployERC721(isMetamask);

    // todo notifications
    try {
      await this.formRef.validateFields();
      console.log(this.formData)
      const {name, symbol} = this.formData
      // await deployNewToken(name, symbol);
      this.formData = initialFormData
    } catch (e) {
      return
    }
  };

  render() {
    return (
      <Box direction="row" justify="center">
        <Form
          ref={ref => (this.formRef = ref)}
          data={this.formData}
          {...({} as any)}
        >

          <Box direction="column" fill={true}>
            <Box direction="row" justify="center">
              <Title>Create Collection</Title>
            </Box>

            <FileInput
              label={<>Upload File <span style={{ fontSize: "14px" }}>We recommend an image of at least 400x400. Gifs work too.</span></>}
              name="logo"
              rules={[
                // isRequired,
                // imageFile
              ]}
            />

            <Input
              label={<>Display Name <span className={styles.labelSpan}>Required</span></>}
              name="name"
              style={{ width: "100%" }}
              placeholder="Token name. Token name cannot be changed in future"
              rules={[isRequired]}
            />

            <Input
              label={<>Symbol <span className={styles.labelSpan}>Required</span></>}
              name="symbol"
              style={{ width: "100%" }}
              placeholder="Token symbol"
              rules={[isRequired]}
            />

            <Input
              label={<>Description <span className={styles.labelSpan}>Optional</span></>}
              name="description"
              style={{ width: "100%" }}
              placeholder="A few words about your token collection"
            />

            {/*<Input
              label="Short URL"
              name="url"
              style={{ width: "100%" }}
              placeholder="URL"
              rules={[isRequired]}
            />*/}

            <Box direction="row" justify="center">
              <Button
                bgColor="#00ADE8"
                style={{ width: 220, margin: 10 }}
                onClick={() => {
                  this.submit()
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
