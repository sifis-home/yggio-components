import React from 'react';

import Button from '../../../components/button';
import {TranslatorsSelectorPage} from '../types';
import {HelpContainer} from '../styled';

interface HelpPageProps {
  onCurrentPageChange: (page: TranslatorsSelectorPage) => void;
}

const HelpPage = (props: HelpPageProps) => {
  return (
    <>
      <HelpContainer>
        <h2>What is a translator?</h2>
        <p>Translators are small programs that decodes or transforms device data.</p>

        <h2>Select a translator</h2>
        <p>
          A device's <mark>deviceModelName</mark> is used to recommend a suitable translator.
          You can however pick any translator you want.
        </p>

        <h2>Multiple translators</h2>
        <p>
          It is possible to have multiple translator on a device. The translator are then "chained",
          meaning that a translator takes input from the prior translators as well as from the
          inital device data.
        </p>

        <h2>Versions</h2>
        <p>
          A translator can have many <mark>versions</mark>. You can select a desired version
          as well as an <mark>upgrade policy</mark>. Upgrade policies are used to automatically
          use a newer version if available. You can choose between four upgrade policies:
        </p>
        <br />
        <p><mark>No upgrades</mark>: The selected version will always be used</p>
        <p><mark>Patch upgrades</mark>: If you've selected version 1.0.0 it will result in 1.0.^</p>
        <p><mark>Minor upgrades</mark>: If you've selected version 1.0.0 it will result in 1.^</p>
        <p><mark>All upgrades</mark>: The absolute newest version available will be used</p>
      </HelpContainer>
      <Button
        label='Back'
        onClick={() => props.onCurrentPageChange(TranslatorsSelectorPage.list)}
        margin='40px 0 0 0'
      />
    </>
  );
};

export default HelpPage;
