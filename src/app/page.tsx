import React from 'react';
import { Button, Flex,Image } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
    <Image src={`/assets/logo.png`} alt={'logo'} width="10" height="10" />
  </Flex>
);

export default App;