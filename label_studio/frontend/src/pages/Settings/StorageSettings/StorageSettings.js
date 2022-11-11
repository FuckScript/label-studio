import React from 'react';
import { Columns } from '../../../components/Columns/Columns';
import { Description } from '../../../components/Description/Description';
import { Block, cn } from '../../../utils/bem';
import { StorageSet } from './StorageSet';
import './StorageSettings.styl';

export const StorageSettings = () => {
  const rootClass = cn("storage-settings");

  return (
    <Block name="storage-settings">
      <Description style={{ marginTop: 0 }}>
        使用云或数据库存储作为标记任务的源或完成的注释的目标。
      </Description>

      <Columns count={2} gap="40px" size="320px" className={rootClass}>
        <StorageSet
          title="源云存储"
          buttonLabel="添加源存储"
          rootClass={rootClass}
        />

        <StorageSet
          title="云存储目标"
          target="export"
          buttonLabel="添加目标"
          rootClass={rootClass}
        />
      </Columns>
    </Block>
  );
};

StorageSettings.title = "云存储";
StorageSettings.path = "/storage";
