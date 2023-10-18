/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface ContainerBoxProps {
  position?: string;
  display?: string;
  flexDirection?: string;
  width?: string;
  widthReduction?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  heightReduction?: string;
  minHeight?: string;
  margin?: string;
  padding?: string;
  background?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default ContainerBoxProps;
