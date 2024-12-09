import React from "react";
import { Button, Flex, Image, message } from "antd";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import Title from "antd/es/typography/Title";
import { Divider } from "antd";
import Link from "next/link";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";

export default async function Page() {
  let questionBankList: any[] = [];
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    if (res.data) {
      questionBankList = res.data.records;
    } else {
      questionBankList = [];
    }
  } catch (e) {
    message.error("获取题库列表失败");
  }


  let questionList: any[] = [];
  try {
    const res = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    if (res.data) {
      questionList = res.data.records;
    } else {
      questionBankList = [];
    }
  } catch (e) {
    message.error("获取题目列表失败");
  }

  return (
    <div className="home_page">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/blanks"}>查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题目</Title>
        <Link href={"/blanks"}>查看更多</Link>
      </Flex>
      <div className="questionList">题目列表
      </div>
    </div>
  );
}
