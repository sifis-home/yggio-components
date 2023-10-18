/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const TableItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: ${({width}) => width || '100%'};
  padding: 0 10px 0;

  &:nth-child(n+2):last-child {
    justify-content: flex-end;
  }

  &:first-child:nth-last-child(3),
  &:first-child:nth-last-child(3) ~ div {
       // Phones and smaller
    @media (max-width: 375.98px) {
      &:nth-last-child(1) {
        display: none;
      }
    }

    // Phones and smaller
    @media (max-width: 575.98px) {
      //&:nth-of-type(3) {
      //
      //}
      &:nth-last-child(2) {
        display: none;
      }
    }

    // Small devices (landscape phones, less than 768px)
    @media (max-width: 767.98px) {

    }

    // Medium devices (tablets, less than 992px)
    @media (max-width: 991.98px) {

    }

    // Large devices (desktops, less than 1200px)
    @media (max-width: 1199.98px) {

    }
  }

  &:first-child:nth-last-child(4),
  &:first-child:nth-last-child(4) ~ div {
       // Phones and smaller
    @media (max-width: 375.98px) {
      &:nth-last-child(1) {
        display: none;
      }
    }

    // Phones and smaller
    @media (max-width: 575.98px) {
      //&:nth-of-type(3) {
      //
      //}
      &:nth-last-child(3) {
        display: none;
      }
    }

    // Small devices (landscape phones, less than 768px)
    @media (max-width: 767.98px) {
      &:nth-last-child(2) {
        display: none;
      }
    }

    // Medium devices (tablets, less than 992px)
    @media (max-width: 991.98px) {

    }

    // Large devices (desktops, less than 1200px)
    @media (max-width: 1199.98px) {

    }
  }

  &:first-child:nth-last-child(5),
  &:first-child:nth-last-child(5) ~ div {
       // Phones and smaller
    @media (max-width: 375.98px) {
      &:nth-last-child(1) {
        display: none;
      }
    }

    // Phones and smaller
    @media (max-width: 575.98px) {
      //&:nth-of-type(3) {
      //
      //}
      &:nth-last-child(4) {
        display: none;
      }
    }

    // Small devices (landscape phones, less than 768px)
    @media (max-width: 767.98px) {
      &:nth-last-child(3) {
        display: none;
      }
    }

    // Medium devices (tablets, less than 992px)
    @media (max-width: 991.98px) {
     &:nth-last-child(2) {
        display: none;
      }
    }

    // Large devices (desktops, less than 1200px)
    @media (max-width: 1199.98px) {

    }
  }

  &:first-child:nth-last-child(6),
  &:first-child:nth-last-child(6) ~ div {
    // Phones and smaller
    @media (max-width: 375.98px) {
      &:nth-last-child(1) {
        display: none;
      }
    }

    // Phones and smaller
    @media (max-width: 575.98px) {
      //&:nth-of-type(3) {
      //
      //}
      &:nth-last-child(5) {
        display: none;
      }
    }

    // Small devices (landscape phones, less than 768px)
    @media (max-width: 767.98px) {
      &:nth-last-child(4) {
        display: none;
      }
    }

    // Medium devices (tablets, less than 992px)
    @media (max-width: 991.98px) {
     &:nth-last-child(3) {
        display: none;
      }
    }

    // Large devices (desktops, less than 1200px)
    @media (max-width: 1199.98px) {
     &:nth-last-child(2) {
        display: none;
      }
    }
  }
`;

export {
  TableItem,
};
