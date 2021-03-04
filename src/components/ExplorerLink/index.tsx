import { truncateAddressString } from "../../utils";
import * as React from "react";

export const ExplorerTransactionLink = ({ hash }) => {
  return (
    <a
      href={process.env.HMY_EXPLORER_URL + "/tx/" + hash}
      target="_blank"
    >
      {hash}
    </a>
  );
};