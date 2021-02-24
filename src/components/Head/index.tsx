import * as React from "react";
import styled, { withTheme } from "styled-components";
import { Box, BoxProps, Text } from "grommet";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import { IStyledChildrenProps } from "interfaces";
import { Title } from "../Base/components/Title";
import { useStores } from "../../stores";
import * as styles from "./styles.styl";
import cn from "classnames";
import { TOKEN } from "../../stores/interfaces";
// import { formatWithTwoDecimals } from '../../utils';
import { ModalView } from "../Base/components/ModalView";
import { WalletBalances } from "../../pages/EthBridge/WalletBalances";

const MainLogo = styled.img`
  width: auto;
  height: 32px;
  margin-bottom: 4px;
`;

const getTokenServiceEnable = process.env.GET_TOKENS_SERVICE === "true";

export const Head: React.FC<IStyledChildrenProps<BoxProps>> = withTheme(
  observer(({ theme, ...props }: IStyledChildrenProps<BoxProps>) => {
    const history = useHistory();
    const { routing, user, exchange, actionModals } = useStores();
    const { palette, container } = theme;
    const { minWidth, maxWidth } = container;

    const isExplorer = history.location.pathname === "/explorer";
    const isTokens = history.location.pathname === "/tokens";
    const isGetTokens = history.location.pathname === "/get-tokens";
    const isFaq = history.location.pathname === "/faq";
    const isInfo = history.location.pathname === "/info";

    const isInventory = history.location.pathname === "/inventory";
    const isCreate = history.location.pathname === "/create";



    const openConnectModal = () => {
      return actionModals.open(() => <WalletBalances />, {
        title: "Connect Your Wallet",
        noValidation: true,
        width: "500px",
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        }
      });
    };

    return (
      <Box
        style={{
          background: palette.StandardWhite,
          // background: '#f6f7fb',
          overflow: "visible",
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 100
          // boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          direction="row"
          align="center"
          justify="between"
          style={{
            minWidth,
            maxWidth,
            margin: "0 auto",
            padding: "0px 30px",
            height: 100,
            minHeight: 100,
            width: "100%"
          }}
        >
          <Box direction="row" align="center">
            <Box
              align="center"
              margin={{ right: "small" }}
              onClick={()=> routing.push(`/create`)}
            >
              <MainLogo src="/daVinci_black.svg" />
            </Box>
          </Box>

          <Box direction="row" align="center" gap="15px">
            {/*{getTokenServiceEnable ? (
              <Box
                className={cn(
                  styles.itemToken,
                  isGetTokens ? styles.selected : ""
                )}
                onClick={() => {
                  routing.push(`/get-tokens`);
                }}
              >
                <Text>Get tokens</Text>
              </Box>
            ) : null}

            <Box
              className={cn(
                styles.itemToken,
                !isInfo && !isFaq && !isExplorer && !isGetTokens && !isTokens
                  ? styles.selected
                  : ""
              )}
              onClick={goToBridge}
            >
              <Text>Bridge</Text>
            </Box>

            <Box
              className={cn(styles.itemToken, isTokens ? styles.selected : "")}
              onClick={() => {
                routing.push(`/tokens`);
              }}
            >
              <Text>Assets</Text>
            </Box>

            <Box
              className={cn(
                styles.itemToken,
                isExplorer ? styles.selected : ""
              )}
              onClick={() => {
                routing.push(`/explorer`);
              }}
            >
              <Text>Transactions</Text>
            </Box>

            <Box
              className={cn(styles.itemToken, isInfo ? styles.selected : "")}
              onClick={() => routing.push("/info")}
            >
              <Text>Info</Text>
            </Box>

            <Box
              className={cn(styles.itemToken, isFaq ? styles.selected : "")}
              onClick={() => routing.push("/faq")}
            >
              <Text>FAQ</Text>
            </Box>*/}

            <Box
              className={cn(styles.itemToken)}
            >
              <Text>
                <a target="_blank" href="https://davinci-1.gitbook.io/davinci">Documentation</a>
              </Text>
            </Box>

            {(true || user.isAuthorized) &&
            <Box
              className={cn(styles.itemToken,  isCreate ? styles.selected : "")}
              onClick={() => routing.push("/create")}
            >
              <Text>Create</Text>
            </Box>
            }

            {(user.isAuthorized) &&
            <Box
              className={cn(styles.itemToken,  isInventory ? styles.selected : "")}
              onClick={() => {
                routing.push("/inventory")
              }}
            >
              <Text>Inventory</Text>
            </Box>
            }

            {user.isAuthorized ?
              <Box
                className={cn(styles.itemToken, "")}
                onClick={() => openConnectModal()}
              >
                <Text>Account</Text>
              </Box>
              :
              <Box
                className={cn(styles.itemToken, styles.selected)}
                onClick={() => openConnectModal()}
              >
                <Text>Connect</Text>
              </Box>
            }


          </Box>
        </Box>
      </Box>
    );
  })
);
