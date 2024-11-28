import React from 'react';
import { Button, Flex,Image } from 'antd';
import { listQuestionBankVoByPageUsingPost } from '@/api/questionBankController';

export default function Page() {
  listQuestionBankVoByPageUsingPost({}).then((res) => {
    console.log("page",res);
});

  return (
    <div>aaaaa</div>
  )
}