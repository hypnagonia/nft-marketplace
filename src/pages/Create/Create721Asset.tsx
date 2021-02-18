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
import { moreThanZero } from "../../utils";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";

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
    ]
  };

  checkPropsRecords = (val) => {
    const props = this.formData.props;
    const length = props.length;


    if (val && (props[length - 1].value || props[length - 1].name)) {
      this.formData.props.push({ value: "", name: "" });
    }
  };

  render() {
    return (
      <Box direction="row" justify="center" margin={{ bottom: "medium" }}>


        <Form
          ref={ref => (this.formRef = ref)}
          data={this.formData}
          {...({} as any)}
          onChange={values => console.log(values)}
        >

          <Box direction="column" fill={true}>

            <Title>Create Collectible</Title>

            <FileInput
              label="Upload File"
              name="logo"
            />

            <Checkbox
              size={200}
              isRowLabel={true}
              label="Put on Sale"
              name="putOnSale"
            />

            <Checkbox
              size={200}
              isRowLabel={true}
              label="Instant Sale Price"
              name="instantSalePrice"
            />

            <Checkbox
              style={{marginBottom:20}}
              size={200}
              isRowLabel={true}
              label="Unlock Once Purchased"
              name="unlockOncePurchased"
            />

            <Input
              label="Name"
              name="name"
              style={{ width: "100%" }}
              placeholder="e.g. Art Gallery"
              rules={[isRequired]}
            />

            <Input
              label="Description (optional)"
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

                  if (
                    value &&
                    Number(value) < 0
                  ) {
                    const defaultMsg = `Incorrect amount`;
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


            <Button
              bgColor="#00ADE8"
              style={{ width: 220 }}
              onClick={() => {
              }}
            >
              Create Collectible
            </Button>

            {JSON.stringify(this.formData)}

          </Box>
        </Form>

      </Box>
    );
  }
};
