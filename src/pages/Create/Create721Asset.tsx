import React, { useState } from "react";
import { Box } from "grommet";
import { Title, Text, Button } from "components/Base";
import * as styles from "./create-styles.styl";
import { PageContainer } from "components/PageContainer";
import { BaseContainer } from "components/BaseContainer";
import { Icon } from "components/Base/components/Icons";
import {
  Form,
  Input,
  isRequired,
  MobxForm,
  NumberInput,
  Checkbox,
  FileInput,
  Switch
} from "components/Form";
import { IStores } from "../../stores";
import { moreThanZero, mediaFile } from "../../utils";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { CollectionSelect } from "../../components/UI/CollectionSelect";

@inject("collections")
@observer
export class Create721Asset extends React.Component<any> {
  formRef: MobxForm;
  data: {};

  constructor(props) {
    super(props);
  }

  @observable formData = {
    royalties: 10,
    name: "",
    description: "",
    symbol: "",
    numberOfCopies: 1,
    props: [
      { name: "", value: "" }
    ],
    collectionIndex: 0,
    unlockOncePurchased: false,
    putOnSale: true,
    instantSalePrice: false,
    digitalCode: "",
    instantPrice: 0
  };

  checkPropsRecords = (val) => {
    const props = this.formData.props;
    const length = props.length;


    if (val && (props[length - 1].value || props[length - 1].name)) {
      this.formData.props.push({ value: "", name: "" });
    }
  };

  render() {
    const collections = this.props.collections.collections;

    return (
      <Box direction="row" justify="center">


        <Form
          ref={ref => (this.formRef = ref)}
          data={this.formData}
          {...({} as any)}
        >

          <Box direction="column" fill={true}>

            <Box direction="row" justify="center">
              <Title>Create Collectible</Title>
            </Box>

            <FileInput
              label={<>Upload File <span style={{fontSize: '14px'}}>PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</span></>}
              name="logo"
              rules={[
                isRequired,
                mediaFile
              ]}
            />

            <span style={{
              marginBottom: "6px",
              fontWeight: "bold",
              color: "rgb(33, 45, 94)",
              fontSize: "18px"
            }}>Choose Collection</span>
            <CollectionSelect
              collections={collections}
              value={this.formData.collectionIndex}
              onChange={(value) => {
                this.formData.collectionIndex = value;
              }}
            />

            <Checkbox
              size={200}
              isRowLabel={true}
              label="Put on Sale"
              name="putOnSale"
            />

            {this.formData.putOnSale && <Checkbox
              size={200}
              isRowLabel={true}
              label="Instant Sale Price"
              name="instantSalePrice"
            />}

            {this.formData.instantSalePrice && <>
              <div style={{ marginTop: 20 }}></div>
              <NumberInput
                label={`Price`}
                name="instantPrice"
                type="decimal"
                placeholder="0"
                style={{ width: "100%" }}
                rules={[
                  moreThanZero
                ]}
              />
            </>}

            <Checkbox
              style={{ marginBottom: 20 }}
              size={200}
              isRowLabel={true}
              label="Unlock Once Purchased"
              name="unlockOncePurchased"
            />

            {this.formData.unlockOncePurchased && <Input
              label="Digital Code"
              name="name"
              style={{ width: "100%" }}
              placeholder="Digital key, code to redeem or a link to file"
            />}


            <Input
              label="Name"
              name="name"
              style={{ width: "100%" }}
              placeholder="e.g. Art Gallery"
              rules={[isRequired]}
            />

            <Input
              label={<>Description <span className={styles.labelSpan}>Optional</span></>}
              name="description"
              style={{ width: "100%" }}
              placeholder="A few words about your collectible"
            />

            <NumberInput
              label={`Royalties %`}
              name="royalties"
              type="integer"
              placeholder="0"
              style={{ width: "100%" }}
              rules={[
                isRequired,
                moreThanZero,
                (_, value, callback) => {
                  const errors = [];

                  if (
                    value &&
                    Number(value) > 100
                  ) {
                    const defaultMsg = `Exceeded the maximum amount`;
                    errors.push(defaultMsg);
                  }

                  callback(errors);
                }
              ]}
            />

            <NumberInput
              label={`Number of Copies`}
              name="numberOfCopies"
              type="integer"
              placeholder="0"
              style={{ width: "100%" }}
              rules={[
                isRequired,
                moreThanZero
              ]}
            />

            <span style={{
              marginBottom: "6px",
              fontWeight: "bold",
              color: "rgb(33, 45, 94)",
              fontSize: "18px"
            }}>Properties</span>

            {this.formData.props.map((prop, index) => (
              <Box direction="row" key={index}>

                <Input
                  name={`props[${index}].name`}
                  placeholder="Property name"
                  onChange={this.checkPropsRecords}
                />

                <div style={{ width: 20 }}></div>

                <Input
                  name={`props[${index}].value`}
                  onChange={this.checkPropsRecords}
                  placeholder="Property value"
                />

              </Box>
            ))
            }

            <Box direction="row" justify="center">
              <Button
                bgColor="#00ADE8"
                style={{ width: 220, margin: 10 }}
                onClick={() => {
                }}
              >
                Create Collectible
              </Button>
            </Box>

          </Box>
        </Form>

      </Box>
    );
  }
};
